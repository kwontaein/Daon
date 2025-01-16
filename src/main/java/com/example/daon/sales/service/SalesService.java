package com.example.daon.sales.service;

import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.customer.repository.CustomerRepository;
import com.example.daon.sales.dto.request.EstimateItemRequest;
import com.example.daon.sales.dto.request.EstimateRequest;
import com.example.daon.sales.dto.request.ReceiptRequest;
import com.example.daon.sales.model.EstimateEntity;
import com.example.daon.sales.model.EstimateItem;
import com.example.daon.sales.model.ReceiptEntity;
import com.example.daon.sales.repository.EstimateItemRepository;
import com.example.daon.sales.repository.EstimateRepository;
import com.example.daon.sales.repository.ReceiptRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SalesService {

    private final EstimateRepository estimateRepository;
    private final EstimateItemRepository estimateItemRepository;
    private final ReceiptRepository receiptRepository;
    private final CustomerRepository customerRepository;

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

    public void updateEstimate(EstimateRequest request) {

        updateEstimateItems(request.getEstimateId(), request.getItems());
    }

    @Transactional
    public void updateEstimateItems(UUID estimateId, List<EstimateItemRequest> itemRequests) {
        // 1. EstimateEntity 가져오기
        EstimateEntity estimate = estimateRepository.findById(estimateId)
                .orElseThrow(() -> new EntityNotFoundException("Estimate not found with id: " + estimateId));

        // 2. 기존 EstimateItem 목록 가져오기
        List<EstimateItem> existingItems = estimate.getItems();

        // 3. 새로운 EstimateItem 목록 생성
        List<EstimateItem> updatedItems = itemRequests.stream()
                .map(request -> request.toEntity(estimate)) // request 객체에서 엔티티 변환
                .collect(Collectors.toList());


        // 4. 삭제 대상 찾기 (기존 목록에 있고, 새로운 목록에 없는 아이템)
        List<EstimateItem> itemsToDelete = existingItems.stream()
                .filter(existingItem -> updatedItems.stream()
                        .noneMatch(updatedItem -> updatedItem.getItemId() != null
                                && updatedItem.getItemId().equals(existingItem.getItemId())))
                .collect(Collectors.toList());

        // 5. 삭제 처리
        itemsToDelete.forEach(item -> {
            estimate.getItems().remove(item); // 관계에서 제거
            estimateItemRepository.delete(item);     // DB에서 삭제
        });

        // 6. 새로운 목록 저장
        estimate.setItems(updatedItems);
        estimateRepository.save(estimate); // 변경 사항 저장
    }

}
