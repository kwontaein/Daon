package com.example.daon.sales.service;

import com.example.daon.admin.model.CompanyEntity;
import com.example.daon.admin.model.UserEntity;
import com.example.daon.admin.repository.CompanyRepository;
import com.example.daon.customer.model.CustomerBillEntity;
import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.customer.repository.CustomerBillRepository;
import com.example.daon.customer.repository.CustomerRepository;
import com.example.daon.global.GlobalService;
import com.example.daon.sales.dto.request.EstimateRequest;
import com.example.daon.sales.dto.request.CustomerBillRequest;
import com.example.daon.sales.dto.request.ReceiptRequest;
import com.example.daon.sales.model.EstimateEntity;
import com.example.daon.sales.model.EstimateItem;
import com.example.daon.sales.model.ReceiptCategory;
import com.example.daon.sales.model.ReceiptEntity;
import com.example.daon.sales.repository.EstimateItemRepository;
import com.example.daon.sales.repository.EstimateRepository;
import com.example.daon.sales.repository.ReceiptRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final CustomerBillRepository customerBillRepository;
    private final CompanyRepository companyRepository;

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
                CustomerEntity customer = customerRepository.findByCustomerName(customerName).orElseThrow(() -> new IllegalArgumentException("잘못된 고객 이름입니다."));
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
        EstimateEntity entity = null;
        //고객 및 견적서 정보를 찾아서
        if (request.getEstimateId() != null) {
            entity = estimateRepository.findById(request.getEstimateId()).orElse(null);
        }
        CustomerEntity customer = customerRepository.findById(request.getCustomerId()).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 아이디입니다."));
        //엔티티화
        ReceiptEntity receipt = request.toEntity(entity, customer);
        //그리고 저장
        receiptRepository.save(receipt);
        //그 후 미수미지급 항목 업데이트
        updateCustomerBill(customer, receipt.getCategory(), receipt.getTotalPrice());
    }

    private void updateCustomerBill(CustomerEntity customer, ReceiptCategory type, int price) {

        CustomerBillEntity customerBillEntity = customerBillRepository.findByCustomer(customer)
                .orElseThrow(() -> new IllegalArgumentException("해당 고객의 미수미지급 현황이 존재하지 않습니다."));

        //내용 수정
        switch (type) {
            case SALES -> customerBillEntity.setSalesAmount(customerBillEntity.getSalesAmount() + price);
            case SALES_DISCOUNT -> customerBillEntity.setSalesDiscount(customerBillEntity.getSalesDiscount() + price);
            case PURCHASE -> customerBillEntity.setPurchaseAmount(customerBillEntity.getPurchaseAmount() + price);
            case PURCHASE_DISCOUNT ->
                    customerBillEntity.setPurchaseDiscount(customerBillEntity.getPurchaseDiscount() + price);
            case DEPOSIT -> customerBillEntity.setCollectionAmount(customerBillEntity.getCollectionAmount() + price);
            case WITHDRAWAL -> customerBillEntity.setPaymentAmount(customerBillEntity.getPaymentAmount() + price);
            default -> throw new UnsupportedOperationException("처리할 수 없는 ReceiptCategory 입니다: " + type);
        }
        //저장
        customerBillRepository.save(customerBillEntity);
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
                // 서브 테이블인 estimateItem 과 조인
                Join<Object, Object> estimateItemJoin = root.join("items", JoinType.INNER);
                // estimateItem 테이블에서 itemName 이 일치하는지 확인
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
                .toList();

        // 2. 삭제 처리
        itemsToDelete.forEach(item -> {
            estimate.getItems().remove(item); // 관계에서 제거
            estimateItemRepository.delete(item); // DB 에서 삭제
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
        EstimateEntity estimate = estimateRepository.findById(request.getEstimateId()).orElseThrow(() -> new IllegalArgumentException("잘못된 아이디입니다."));
        //원래의 반대로 저장
        estimate.setReceipted(!estimate.isReceipted());
    }

    //미수미지급항목 검색
    public List<CustomerBillEntity> getCustomerBills(CustomerBillRequest request) {
        Specification<CustomerBillEntity> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 1) 고객명(customerName)으로 검색
            //    customerBillEntity.customer.name 이라고 가정(실제 필드명에 맞춰 수정)
            if (request.getCustomerName() != null && !request.getCustomerName().isEmpty()) {
                // 예시: LIKE 검색
                predicates.add(cb.like(
                        cb.lower(root.get("customer").get("name")),
                        "%" + request.getCustomerName().toLowerCase() + "%"
                ));
            }

            // 2) 날짜 범위(sDate ~ eDate)
            //    CustomerBillEntity에 날짜 필드가 없으므로,
            //    실제로 어떤 날짜를 기준으로 조회할지 결정 필요.
            //    가령 createdDate 라는 필드가 있다고 가정해 예시만 작성.
            if (request.getSDate() != null && request.getEDate() != null) {
                predicates.add(
                        cb.between(root.get("createdDate"), request.getSDate(), request.getEDate())
                );
            }

            // 3) currentMonthSales == true 인 경우, 매출액(salesAmount)이 0보다 큰 것만 조회 등
            //    실무 로직에 맞춰 조건을 추가한다.
            if (request.isCurrentMonthSales()) {
                predicates.add(cb.greaterThan(root.get("salesAmount"), 0));
            }

            //    currentMonthPurchases == true 인 경우, 매입액(purchaseAmount)이 0보다 큰 것만
            if (request.isCurrentMonthPurchases()) {
                predicates.add(cb.greaterThan(root.get("purchaseAmount"), 0));
            }

            //    currentMonthDeposits == true 인 경우, 입금액(collectionAmount) 필터 등
            if (request.isCurrentMonthDeposits()) {
                predicates.add(cb.greaterThan(root.get("collectionAmount"), 0));
            }

            //    currentMonthWithdrawals == true 인 경우, 출금액(paymentAmount) 필터 등
            if (request.isCurrentMonthWithdrawals()) {
                predicates.add(cb.greaterThan(root.get("paymentAmount"), 0));
            }

            //    만약 currentMonthTransactions == true 라면, 매출/매입/입금/출금 중 하나라도 0보다 큰지 등
            if (request.isCurrentMonthTransactions()) {
                Predicate sales = cb.greaterThan(root.get("salesAmount"), 0);
                Predicate purchases = cb.greaterThan(root.get("purchaseAmount"), 0);
                Predicate deposits = cb.greaterThan(root.get("collectionAmount"), 0);
                Predicate withdrawals = cb.greaterThan(root.get("paymentAmount"), 0);

                // 4개 중 하나라도 만족하면 true => OR 조건
                predicates.add(cb.or(sales, purchases, deposits, withdrawals));
            }

            // 4) previousMonthCarryOver == true 인 경우, 전기이월(previousBalance)이 0 이상인 것만
            //    등의 조건을 예시로 추가
            if (request.isPreviousMonthCarryOver()) {
                predicates.add(cb.greaterThan(root.get("previousBalance"), 0));
            }

            // 조건들이 누적된 리스트를 AND로 묶어서 반환
            return cb.and(predicates.toArray(new Predicate[0]));
        };

        // 정렬 조건 적용
        // 예) request.getSort() == "salesAmountDesc" => 매출액 기준 내림차순
        Sort sort = createSort(request.getSort());

        // 최종 실행
        return customerBillRepository.findAll(spec, sort);
    }

    // 예시: 정렬 문자열에 따라 Sort 객체 만들기
    private Sort createSort(String sortParam) {
        if (sortParam == null || sortParam.isEmpty()) {
            // 기본 정렬 없다면, 정렬 없이 반환
            return Sort.unsorted();
        }

        // 단순 예시로, salesAmountDesc 만 처리한다고 가정
        if ("salesAmountDesc".equalsIgnoreCase(sortParam)) {
            return Sort.by(Sort.Direction.DESC, "salesAmount");
        } else if ("salesAmountAsc".equalsIgnoreCase(sortParam)) {
            return Sort.by(Sort.Direction.ASC, "salesAmount");
        }
        // 필요에 따라 다른 케이스 추가
        return Sort.unsorted();
    }
}
