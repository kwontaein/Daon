package com.example.daon.ledger.service;

import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.customer.repository.CustomerRepository;
import com.example.daon.global.service.GlobalService;
import com.example.daon.ledger.dto.request.LedgerRequest;
import com.example.daon.ledger.dto.response.NoPaidResponse;
import com.example.daon.receipts.model.ReceiptCategory;
import com.example.daon.receipts.model.ReceiptEntity;
import com.example.daon.receipts.repository.ReceiptRepository;
import com.example.daon.stock.model.StockEntity;
import com.example.daon.stock.repository.StockRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LedgerService {

    private final ReceiptRepository receiptRepository;
    private final StockRepository stockRepository;
    private final CustomerRepository customerRepository;
    private final GlobalService globalService;

    @PersistenceContext
    private EntityManager em;

    /**
     * 공통검색조건
     */
    private void addAllPredicate(LedgerRequest ledgerRequest, CriteriaBuilder criteriaBuilder, Root<ReceiptEntity> root, List<Predicate> predicates) {

        //기간조건
        if (ledgerRequest.getSearchSDate() != null && ledgerRequest.getSearchEDate() != null) {
            predicates.add(criteriaBuilder.between(root.get("timeStamp"), ledgerRequest.getSearchSDate(), ledgerRequest.getSearchEDate()));
        }

        // 거래처 조건
        if (ledgerRequest.getCustomerId() != null) {
            // 고객 카테고리 조건
            if (ledgerRequest.getCustomerCate() != null) {
                predicates.add(criteriaBuilder.equal(root.get("customer").get("category"), ledgerRequest.getCustomerCate()));
            }

            // 고객 소속(affiliation) 조건
            if (ledgerRequest.getAffiliation() != null) {
                // 예: customerCateId 필드가 있을 경우
                predicates.add(criteriaBuilder.equal(root.get("customer").get("customerCateId"), ledgerRequest.getAffiliation()));
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

    //원장조회
    public List<ReceiptEntity> getLedgers(LedgerRequest ledgerRequest) {
        return receiptRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();
            addAllPredicate(ledgerRequest, criteriaBuilder, root, predicates);

            // 전표 선택 옵션 추가
            addCategoryPredicates(ledgerRequest, criteriaBuilder, root, predicates);

            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }

    // 카테고리에 따른 분류
    private void addCategoryPredicates(LedgerRequest ledgerRequest, CriteriaBuilder criteriaBuilder, Root<ReceiptEntity> root, List<Predicate> predicates) {
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
    }

    //품목별원장
    public List<ReceiptEntity> getStockLedger(LedgerRequest ledgerRequest) {
        return null;
    }


    //매출장
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

    //매입장
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

    //관리비원장
    public List<ReceiptEntity> getFeeReceipt(LedgerRequest ledgerRequest) {
        return receiptRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(criteriaBuilder.equal(root.get("category"), ReceiptCategory.MAINTENANCE_FEE));

            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }

    //재고조사서
    public List<StockEntity> getStockSurvey(LedgerRequest ledgerRequest) {
        return stockRepository.findAll();
    }


    //넌 일단 보류 - 기타원장
    public List<ReceiptEntity> getExtraLedger(LedgerRequest ledgerRequest) {
        return null;
    }


    //미수미지급
    public List<NoPaidResponse> getNoPaid(LedgerRequest ledgerRequest) {
        // 1) JPA Repository의 findAll 메서드를 이용하여 동적 쿼리를 구성
        List<ReceiptEntity> receipts = receiptRepository.findAll((root, query, criteriaBuilder) -> {
            // 조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();

            // ledgerRequest에 따른 조건을 predicates에 추가(날짜, 거래처, 금액 범위 등)
            addAllPredicate(ledgerRequest, criteriaBuilder, root, predicates);

            // 기간 포함 검색 (startDate ~ endDate 조건 추가)
            if (ledgerRequest.getSearchSDate() != null && ledgerRequest.getSearchEDate() != null) {
                predicates.add(criteriaBuilder.between(root.get("timeStamp"), ledgerRequest.getSearchSDate(), ledgerRequest.getSearchEDate()));
            }

            // 전표 선택 옵션 추가
            addCategoryPredicates(ledgerRequest, criteriaBuilder, root, predicates);

            // 조합된 조건(Predicate 배열)을 반환하여 동적 쿼리 생성
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });

        // 3) 변환된 결과를 반환
        return receipts.stream().map(globalService::convertToNoPaidResponse).collect(Collectors.toList());
    }

    public static Specification<ReceiptEntity> betweenTimeStamp(LocalDateTime start, LocalDateTime end) {
        return (root, query, cb) -> cb.between(root.get("timeStamp"), start, end);
    }

    /**
     * 특정 기간 사이의 전표 중,
     * 거래처별로 카테고리1~6 totalPrice 합계를 구하여 반환.
     */
    public void getCategorySumByCustomer(LocalDateTime start, LocalDateTime end) {

        // 1) CriteriaBuilder, CriteriaQuery, Root 준비
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<NoPaidResponse> cq = cb.createQuery(NoPaidResponse.class);
        Root<ReceiptEntity> root = cq.from(ReceiptEntity.class);

        // 2) 동적 조건(where) Spec과 결합
        //    스펙은 Predicate를 리턴하므로, 이것을 쿼리에 적용
        Specification<ReceiptEntity> spec = betweenTimeStamp(start, end);
        Predicate specPredicate = spec.toPredicate(root, cq, cb);

        // 3) 카테고리별 CASE WHEN sum(...) Expression들 정의
        Expression<Integer> category1Sum = cb.sum(
                cb.<Integer>selectCase()
                        .when(cb.equal(root.get("category"), ReceiptCategory.SALES), root.get("totalPrice"))
                        .otherwise(0)
        );
        Expression<Integer> category2Sum = cb.sum(
                cb.<Integer>selectCase()
                        .when(cb.equal(root.get("category"), ReceiptCategory.DEPOSIT), root.get("totalPrice"))
                        .otherwise(0)
        );
        Expression<Integer> category3Sum = cb.sum(
                cb.<Integer>selectCase()
                        .when(cb.equal(root.get("category"), ReceiptCategory.PURCHASE), root.get("totalPrice"))
                        .otherwise(0)
        );
        Expression<Integer> category4Sum = cb.sum(
                cb.<Integer>selectCase()
                        .when(cb.equal(root.get("category"), ReceiptCategory.WITHDRAWAL), root.get("totalPrice"))
                        .otherwise(0)
        );
        Expression<Integer> category5Sum = cb.sum(
                cb.<Integer>selectCase()
                        .when(cb.equal(root.get("category"), ReceiptCategory.SALES_DISCOUNT), root.get("totalPrice"))
                        .otherwise(0)
        );
        Expression<Integer> category6Sum = cb.sum(
                cb.<Integer>selectCase()
                        .when(cb.equal(root.get("category"), ReceiptCategory.PURCHASE_DISCOUNT), root.get("totalPrice"))
                        .otherwise(0)
        );
        Expression<Integer> category7Sum = cb.sum(
                cb.<Integer>selectCase()
                        .when(cb.equal(root.get("category"), ReceiptCategory.MAINTENANCE_FEE), root.get("totalPrice"))
                        .otherwise(0)
        );

        // 4) multiselect로 '거래처이름' + '카테고리별 합산'
        //    별도 DTO에 매핑
        cq.multiselect(
                root.get("customer").get("customerName"), // or customerCode, etc
                category1Sum,
                category2Sum,
                category3Sum,
                category4Sum,
                category5Sum,
                category6Sum,
                category7Sum
        );

        // 5) where, groupBy, orderBy 등 설정
        cq.where(specPredicate);
        cq.groupBy(root.get("customer").get("customerName"));
        cq.orderBy(cb.asc(root.get("customer").get("customerName"))); // 필요 시

        // 6) 최종 쿼리 실행
        System.out.println(em.createQuery(cq).getResultList());
        //return em.createQuery(cq).getResultList();
    }

}
