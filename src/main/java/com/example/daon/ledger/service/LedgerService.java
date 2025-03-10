package com.example.daon.ledger.service;

import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.customer.repository.CustomerRepository;
import com.example.daon.ledger.dto.LedgerRequest;
import com.example.daon.receipts.model.ReceiptCategory;
import com.example.daon.receipts.model.ReceiptEntity;
import com.example.daon.receipts.repository.ReceiptRepository;
import com.example.daon.stock.model.StockEntity;
import com.example.daon.stock.repository.StockRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LedgerService {

    private final ReceiptRepository receiptRepository;
    private final StockRepository stockRepository;
    private final CustomerRepository customerRepository;

    /**
     * 공통검색조건
     */
    private void addAllPredicate(LedgerRequest ledgerRequest,
                                 CriteriaBuilder criteriaBuilder,
                                 Root<ReceiptEntity> root,
                                 List<Predicate> predicates) {

        //기간조건
        if (ledgerRequest.getSearchSDate() != null && ledgerRequest.getSearchEDate() != null) {
            predicates.add(criteriaBuilder.between(root.get("timeStamp"), ledgerRequest.getSearchSDate().atStartOfDay(), ledgerRequest.getSearchEDate().atTime(23, 59, 59)));
        }

        // 거래처 조건
        if (ledgerRequest.getCustomerId() != null) {
            // 고객 카테고리 조건
            if (ledgerRequest.getCustomerCate() != null) {
                predicates.add(
                        criteriaBuilder.equal(
                                root.get("customer").get("category"),
                                ledgerRequest.getCustomerCate()
                        )
                );
            }

            // 고객 소속(affiliation) 조건
            if (ledgerRequest.getAffiliation() != null) {
                // 예: customerCateId 필드가 있을 경우
                predicates.add(
                        criteriaBuilder.equal(
                                root.get("customer").get("customerCateId"),
                                ledgerRequest.getAffiliation()
                        )
                );
            }
            // 단일 거래처 ID로 필터
            CustomerEntity customer = customerRepository.findById(ledgerRequest.getCustomerId()).orElse(null);
            if (customer != null) {
                predicates.add(criteriaBuilder.equal(root.get("customer"), customer));
            }
        } else if (ledgerRequest.getCustomerIds() != null && !ledgerRequest.getCustomerIds().isEmpty()) {
            // 복수 거래처
            List<CustomerEntity> customers = customerRepository.findAllById(ledgerRequest.getCustomerIds());
            predicates.add(root.get("customer").in(customers));
        }

        // 품목 조건
        if (ledgerRequest.getStockId() != null) {
            predicates.add(criteriaBuilder.equal(root.get("itemNumber"), ledgerRequest.getStockId()));
        }
    }

    public List<ReceiptEntity> getLedgers(LedgerRequest ledgerRequest) {
        return receiptRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();
            addAllPredicate(ledgerRequest, criteriaBuilder, root, predicates);

            //전표선택옵션
            if (ledgerRequest.isDeposit())
                predicates.add(criteriaBuilder.equal(root.get("category"), ReceiptCategory.DEPOSIT));

            if (ledgerRequest.isSales())
                predicates.add(criteriaBuilder.equal(root.get("category"), ReceiptCategory.SALES));
            if (ledgerRequest.isSalesDiscount())
                predicates.add(criteriaBuilder.equal(root.get("category"), ReceiptCategory.SALES_DISCOUNT));

            if (ledgerRequest.isPurchase())
                predicates.add(criteriaBuilder.equal(root.get("category"), ReceiptCategory.PURCHASE));
            if (ledgerRequest.isPurchaseDiscount())
                predicates.add(criteriaBuilder.equal(root.get("category"), ReceiptCategory.PURCHASE_DISCOUNT));

            if (ledgerRequest.isReturnIn())
                predicates.add(criteriaBuilder.equal(root.get("category"), ReceiptCategory.RETURN_IN));
            if (ledgerRequest.isReturnOut())
                predicates.add(criteriaBuilder.equal(root.get("category"), ReceiptCategory.RETURN_OUT));

            if (ledgerRequest.isWithdrawal())
                predicates.add(criteriaBuilder.equal(root.get("category"), ReceiptCategory.WITHDRAWAL));
            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }

    public List<ReceiptEntity> getStockLedger(LedgerRequest ledgerRequest) {
        return null;
    }


    public List<ReceiptEntity> getSaleReceipt(LedgerRequest ledgerRequest) {
        return receiptRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();
            addAllPredicate(ledgerRequest, criteriaBuilder, root, predicates);
            predicates.add(criteriaBuilder.equal(root.get("category"), ReceiptCategory.SALES));

            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }

    public List<ReceiptEntity> getPurchaseReceipt(LedgerRequest ledgerRequest) {
        return receiptRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();
            addAllPredicate(ledgerRequest, criteriaBuilder, root, predicates);
            predicates.add(criteriaBuilder.equal(root.get("category"), ReceiptCategory.PURCHASE));

            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }

    public List<ReceiptEntity> getFeeReceipt(LedgerRequest ledgerRequest) {
        return receiptRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(criteriaBuilder.equal(root.get("category"), ReceiptCategory.MAINTENANCE_FEE));

            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }

    public List<StockEntity> getStockSurvey(LedgerRequest ledgerRequest) {
        return stockRepository.findAll();
    }


    //넌 일단 보류
    public List<ReceiptEntity> getExtraLedger(LedgerRequest ledgerRequest) {
        return null;
    }
}
