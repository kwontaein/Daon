package com.example.daon.sales.service;

import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.customer.repository.CustomerRepository;
import com.example.daon.sales.model.ReceiptEntity;
import com.example.daon.sales.repository.EstimateRepository;
import com.example.daon.sales.repository.ReceiptRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SalesService {

    private final EstimateRepository estimateRepository;
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
     * 전표 저장 및 수정
     */
    public void saveReceipt(ReceiptEntity entity) {
        //save는 아이디가 이미 있는 객체의 경우 수정을 진행함
        receiptRepository.save(entity);
    }

    public void deleteReceipts(List<UUID> ids) {
        receiptRepository.deleteAllById(ids);
    }
}
