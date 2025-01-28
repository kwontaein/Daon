package com.example.daon.sales.service;

import com.example.daon.admin.model.CompanyEntity;
import com.example.daon.admin.model.UserEntity;
import com.example.daon.admin.repository.CompanyRepository;
import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.customer.repository.CustomerRepository;
import com.example.daon.global.GlobalService;
import com.example.daon.sales.dto.request.EstimateItemRequest;
import com.example.daon.sales.dto.request.EstimateRequest;
import com.example.daon.sales.dto.request.NoPaidRequest;
import com.example.daon.sales.dto.request.ReceiptRequest;
import com.example.daon.sales.dto.response.NoPaidResponse;
import com.example.daon.sales.model.EstimateEntity;
import com.example.daon.sales.model.EstimateItem;
import com.example.daon.sales.model.ReceiptCategory;
import com.example.daon.sales.model.ReceiptEntity;
import com.example.daon.sales.repository.EstimateItemRepository;
import com.example.daon.sales.repository.EstimateRepository;
import com.example.daon.sales.repository.ReceiptRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SalesService {

    private final EstimateRepository estimateRepository;
    private final EstimateItemRepository estimateItemRepository;
    private final ReceiptRepository receiptRepository;
    private final CustomerRepository customerRepository;
    private final CompanyRepository companyRepository;

    private final EntityManager entityManager;
    private final GlobalService globalService;

    public List<ReceiptEntity> getReceipts(LocalDate startDate, LocalDate endDate, String customerName, String itemName) {
        return receiptRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();

            // 기간 조건
            if (startDate != null && endDate != null) {
                predicates.add(criteriaBuilder.between(root.get("timeStamp"), startDate.atStartOfDay(), endDate.atTime(23, 59, 59)));
            }

            // 거래처 조건
            if (customerName != null) {
                //거래처 이름으로 아이디 얻기
                CustomerEntity customer = customerRepository.findByCustomerName(customerName).orElse(null);
                predicates.add(criteriaBuilder.equal(root.get("customerId"), customer.getCustomerId()));
            }

            // 품목 조건
            if (itemName != null) {
                //TODO 품목 이름으로 아이디 얻기
                predicates.add(criteriaBuilder.equal(root.get("itemNumber"), itemName));
            }

            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }

    /**
     * 전표 저장 및 수정 공통 로직
     */
    private void saveOrUpdateReceipt(ReceiptRequest request) {
        EstimateEntity entity = estimateRepository.findById(request.getEstimateId()).orElse(null);
        receiptRepository.save(request.toEntity(entity));
    }

    /**
     * 전표 저장 및 수정 (단일 객체)
     */
    public void updateReceipt(ReceiptRequest request) {
        saveOrUpdateReceipt(request);
    }

    /**
     * 전표 저장 및 수정 (여러 객체)
     */
    public void saveReceipt(List<ReceiptRequest> requests) {
        for (ReceiptRequest request : requests) {
            saveOrUpdateReceipt(request);
        }
    }


    public void deleteReceipts(List<UUID> ids) {
        receiptRepository.deleteAllById(ids);
    }

    //견적서 조회
    public List<EstimateEntity> getEstimates(LocalDate searchSDate, LocalDate searchEDate, String customerName, String itemName) {
        // 견적서 조회 조건: 전표로 전환되지 않은 견적서
        if (searchSDate == null && searchEDate == null && customerName == null && itemName == null) {
            return estimateRepository.findByReceipted(false).orElse(null);
        }

        // 동적 검색 조건 적용
        return estimateRepository.findAll((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 기간 조건
            if (searchSDate != null && searchEDate != null) {
                predicates.add(criteriaBuilder.between(
                        root.get("timeStamp"),
                        searchSDate.atStartOfDay(),
                        searchEDate.atTime(23, 59, 59)
                ));
            }

            // 거래처 조건
            if (customerName != null) {
                customerRepository.findByCustomerName(customerName)
                        .ifPresentOrElse(
                                customer -> predicates.add(criteriaBuilder.equal(root.get("customerId"), customer.getCustomerId())),
                                () -> {
                                    throw new EntityNotFoundException("Customer not found: " + customerName);
                                }
                        );
            }

            // 품목 조건
            if (itemName != null) {
                // 서브 테이블인 estimateItem과 조인
                Join<Object, Object> estimateItemJoin = root.join("items", JoinType.INNER);
                // estimateItem 테이블에서 itemName이 일치하는지 확인
                predicates.add(criteriaBuilder.equal(estimateItemJoin.get("itemName"), itemName));
            }


            // 동적 조건 조합
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }

    @Transactional
    public void updateTest(EstimateRequest request) {
        // 1. 기존 EstimateEntity 가져오기
        EstimateEntity estimate = estimateRepository.findById(request.getEstimateId())
                .orElseThrow(() -> new EntityNotFoundException("Estimate not found with id: " + request.getEstimateId()));

        // 2. 관련 엔티티 가져오기
        CustomerEntity customer = customerRepository.findById(request.getCustomerId()).orElse(null);
        CompanyEntity company = companyRepository.findByCompanyName(request.getCompanyName()).orElse(null);
        UserEntity user = globalService.getUserEntity(null);

        // 3. 새로운 아이템 리스트 변환
        List<EstimateItem> newItems = request.getItems().stream()
                .map(itemRequest -> itemRequest.toEntity(estimate))
                .collect(Collectors.toList());

        // 4. 기존 아이템과 새로운 아이템 비교 및 처리
        syncItems(estimate, newItems);

        // 5. 필드 업데이트
        estimate.updateFields(customer, company, user, newItems);

        // 6. 저장
        estimateRepository.save(estimate);
    }

    // 기존 아이템과 새로운 아이템을 동기화
    private void syncItems(EstimateEntity estimate, List<EstimateItem> newItems) {
        List<EstimateItem> existingItems = estimate.getItems();

        // 1. 삭제할 아이템 찾기
        List<EstimateItem> itemsToDelete = existingItems.stream()
                .filter(existingItem -> newItems.stream()
                        .noneMatch(newItem -> newItem.getItemId() != null
                                && newItem.getItemId().equals(existingItem.getItemId())))
                .collect(Collectors.toList());

        // 2. 삭제 처리
        itemsToDelete.forEach(item -> {
            estimate.getItems().remove(item); // 관계에서 제거
            estimateItemRepository.delete(item); // DB에서 삭제
        });

        // 3. 추가 또는 업데이트 처리
        for (EstimateItem newItem : newItems) {
            Optional<EstimateItem> existingItemOptional = existingItems.stream()
                    .filter(existingItem -> existingItem.getItemId() != null
                            && existingItem.getItemId().equals(newItem.getItemId()))
                    .findFirst();

            if (existingItemOptional.isPresent()) {
                // 기존 아이템 업데이트
                EstimateItem existingItem = existingItemOptional.get();
                existingItem.updateFields(newItem); // 필드 업데이트
            } else {
                // 새로운 아이템 추가
                estimate.getItems().add(newItem);
            }
        }
    }


    //전표전환
    public void estimatesPaid(EstimateRequest request) {
        //전달받은 아이디의 엔티티 isReceipted 를 true / false 로 변경
        EstimateEntity estimate = estimateRepository.findById(request.getEstimateId()).orElse(null);
        //원래의 반대로 저장
        estimate.setReceipted(!estimate.isReceipted());
    }

    public List<NoPaidResponse> getNoPaid(NoPaidRequest request) {
        // ReceiptEntity 리스트를 조회
        List<ReceiptEntity> receipts = receiptRepository.findAll((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 고객 조건
            if (request.getCustomerName() != null) {
                UUID customerId = customerRepository.findByCustomerName(request.getCustomerName())
                        .orElseThrow(() -> new IllegalArgumentException("Customer not found"))
                        .getCustomerId();
                predicates.add(criteriaBuilder.equal(root.get("customerId"), customerId));
            }

            // 포함 조건
            if ("NO_RECEIVABLE".equals(request.getIncludeCondition())) {
                predicates.add(criteriaBuilder.greaterThan(root.get("totalPrice"), BigDecimal.ZERO));
            } else if ("NO_PAYABLE".equals(request.getIncludeCondition())) {
                predicates.add(criteriaBuilder.lessThan(root.get("totalPrice"), BigDecimal.ZERO));
            }

            // 동적 조건 조합
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });

        // 2. ReceiptEntity -> NoPaidResponse 변환
        return receipts.stream()
                .collect(Collectors.groupingBy(ReceiptEntity::getCustomer)) // 고객별로 그룹화
                .entrySet().stream()
                .map(entry -> mapToNoPaidResponse(entry.getKey().getCustomerId(), entry.getValue()))
                .toList();
    }

    private NoPaidResponse mapToNoPaidResponse(UUID customerId, List<ReceiptEntity> receipts) {
        // 각 ReceiptCategory 별로 금액 계산
        BigDecimal previousBalance = BigDecimal.ZERO;
        BigDecimal salesAmount = BigDecimal.ZERO;
        BigDecimal collectionAmount = BigDecimal.ZERO;
        BigDecimal purchaseAmount = BigDecimal.ZERO;
        BigDecimal paymentAmount = BigDecimal.ZERO;
        BigDecimal salesDiscount = BigDecimal.ZERO;
        BigDecimal purchaseDiscount = BigDecimal.ZERO;

        for (ReceiptEntity receipt : receipts) {
            switch (receipt.getCategory()) {
                case SALES -> salesAmount = salesAmount.add(receipt.getTotalPrice());
                case DEPOSIT -> collectionAmount = collectionAmount.add(receipt.getTotalPrice());
                case PURCHASE -> purchaseAmount = purchaseAmount.add(receipt.getTotalPrice());
                case WITHDRAWAL -> paymentAmount = paymentAmount.add(receipt.getTotalPrice());
                case SALES_DISCOUNT -> salesDiscount = salesDiscount.add(receipt.getTotalPrice());
                case PURCHASE_DISCOUNT -> purchaseDiscount = purchaseDiscount.add(receipt.getTotalPrice());
                default -> {
                    // 전기이월 등 다른 카테고리
                    if (receipt.getCategory() == ReceiptCategory.OPERATING_PROFIT) {
                        previousBalance = previousBalance.add(receipt.getTotalPrice());
                    }
                }
            }
        }

        // 잔액 계산
        BigDecimal currentBalance = previousBalance
                .add(salesAmount)
                .add(collectionAmount)
                .subtract(purchaseAmount)
                .subtract(paymentAmount)
                .subtract(salesDiscount)
                .add(purchaseDiscount);

        // 고객 이름 가져오기
        String customerName = customerRepository.findById(customerId)
                .map(CustomerEntity::getCustomerName)
                .orElse("Unknown Customer");

        // NoPaidResponse 생성
        return NoPaidResponse.builder()
                .customerName(customerName)
                .previousBalance(previousBalance)
                .salesAmount(salesAmount)
                .collectionAmount(collectionAmount)
                .purchaseAmount(purchaseAmount)
                .paymentAmount(paymentAmount)
                .salesDiscount(salesDiscount)
                .purchaseDiscount(purchaseDiscount)
                .currentBalance(currentBalance)
                .build();
    }
}
