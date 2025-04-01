package com.example.daon.ledger.service;

import com.example.daon.customer.model.AffiliationEntity;
import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.customer.repository.AffiliationRepository;
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
    private final AffiliationRepository affiliationRepository;
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
            if (ledgerRequest.getAffiliationId() != null) {
                AffiliationEntity affiliation = affiliationRepository.findById(ledgerRequest.getAffiliationId()).orElse(null);
                // 예: customerCateId 필드가 있을 경우
                predicates.add(criteriaBuilder.equal(root.get("customer").get("customerAffiliation"), affiliation));
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
            //입금
            predicates.add(criteriaBuilder.equal(root.get("category"), ReceiptCategory.DEPOSIT));

        if (ledgerRequest.isSales())
            //매출
            predicates.add(criteriaBuilder.equal(root.get("category"), ReceiptCategory.SALES));

        if (ledgerRequest.isSalesDiscount())
            //매출할인
            predicates.add(criteriaBuilder.equal(root.get("category"), ReceiptCategory.SALES_DISCOUNT));

        if (ledgerRequest.isPurchase())
            //매입
            predicates.add(criteriaBuilder.equal(root.get("category"), ReceiptCategory.PURCHASE));

        if (ledgerRequest.isPurchaseDiscount())
            //매입할인
            predicates.add(criteriaBuilder.equal(root.get("category"), ReceiptCategory.PURCHASE_DISCOUNT));

        if (ledgerRequest.isReturnIn())
            //반품입고
            predicates.add(criteriaBuilder.equal(root.get("category"), ReceiptCategory.RETURN_IN));

        if (ledgerRequest.isReturnOut())
            //반품출고
            predicates.add(criteriaBuilder.equal(root.get("category"), ReceiptCategory.RETURN_OUT));

        if (ledgerRequest.isWithdrawal())
            //출금
            predicates.add(criteriaBuilder.equal(root.get("category"), ReceiptCategory.WITHDRAWAL));
    }

    //품목별원장
    public List<ReceiptEntity> getStockLedger(LedgerRequest ledgerRequest) {
        //날짜 계정 거래처	적요	단가	판매	반품	매입	반출	재고	금액
        return receiptRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();
            addAllPredicate(ledgerRequest, criteriaBuilder, root, predicates);
            //해당 품목의 전표 검색
            if (ledgerRequest.getStockId() != null) {
                StockEntity stock = stockRepository.findById(ledgerRequest.getStockId()).orElse(null);
                predicates.add(criteriaBuilder.equal(root.get("stock"), stock));
            }

            addCategoryPredicates(ledgerRequest, criteriaBuilder, root, predicates);
            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }


    //매출장
    public List<ReceiptEntity> getSaleReceipt(LedgerRequest ledgerRequest) {
        //날짜 계정 거래처	품명	규격	적요	수량	단가	합계금액
        return receiptRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();
            addAllPredicate(ledgerRequest, criteriaBuilder, root, predicates);
            predicates.add(criteriaBuilder.equal(root.get("category"), ReceiptCategory.SALES));
            if (ledgerRequest.getStockId() != null) {
                StockEntity stock = stockRepository.findById(ledgerRequest.getStockId()).orElse(null);
                predicates.add(criteriaBuilder.equal(root.get("stock"), stock));
            }
            if (ledgerRequest.getCustomerId() != null) {
                // 단일 거래처 ID로 필터
                CustomerEntity customer = customerRepository.findById(ledgerRequest.getCustomerId()).orElse(null);
                predicates.add(criteriaBuilder.equal(root.get("customer"), customer));
            }
            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }

    //매입장
    public List<ReceiptEntity> getPurchaseReceipt(LedgerRequest ledgerRequest) {
        //날짜 계정 거래처 품명 규격 적요 수량 단가 합계금액
        return receiptRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();
            addAllPredicate(ledgerRequest, criteriaBuilder, root, predicates);
            predicates.add(criteriaBuilder.equal(root.get("category"), ReceiptCategory.PURCHASE));
            if (ledgerRequest.getStockId() != null) {
                StockEntity stock = stockRepository.findById(ledgerRequest.getStockId()).orElse(null);
                predicates.add(criteriaBuilder.equal(root.get("stock"), stock));
            }
            if (ledgerRequest.getCustomerId() != null) {
                // 단일 거래처 ID로 필터
                CustomerEntity customer = customerRepository.findById(ledgerRequest.getCustomerId()).orElse(null);
                predicates.add(criteriaBuilder.equal(root.get("customer"), customer));
            }
            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }

    //관리비원장
    public List<ReceiptEntity> getFeeReceipt(LedgerRequest ledgerRequest) {
        //날짜 계정 품명 적요 합계
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
        return stockRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();
            if (ledgerRequest.getAffiliationId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("category"), ledgerRequest.getStockCate()));
            }
            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
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
     * 전기이월? -> 그 이전까지의 값 계산...?
     */
    public void getCategorySumByCustomer(LocalDateTime start, LocalDateTime end) {
//++--+-+
        // 1) CriteriaBuilder, CriteriaQuery, Root 준비
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<NoPaidResponse> cq = cb.createQuery(NoPaidResponse.class);
        Root<ReceiptEntity> root = cq.from(ReceiptEntity.class);

        // 2) 동적 조건(where) Spec과 결합
        //    스펙은 Predicate를 리턴하므로, 이것을 쿼리에 적용
        Specification<ReceiptEntity> spec = betweenTimeStamp(start, end);
        Predicate specPredicate = spec.toPredicate(root, cq, cb);

        // 3) 카테고리별 CASE WHEN sum(...) Expression들 정의
        Expression<Integer> sales = cb.sum(
                cb.<Integer>selectCase()
                        .when(cb.equal(root.get("category"), ReceiptCategory.SALES), root.get("totalPrice"))
                        .otherwise(0)
        );
        Expression<Integer> deposit = cb.sum(
                cb.<Integer>selectCase()
                        .when(cb.equal(root.get("category"), ReceiptCategory.DEPOSIT), root.get("totalPrice"))
                        .otherwise(0)
        );
        Expression<Integer> purchase = cb.sum(
                cb.<Integer>selectCase()
                        .when(cb.equal(root.get("category"), ReceiptCategory.PURCHASE), root.get("totalPrice"))
                        .otherwise(0)
        );
        Expression<Integer> withdrawal = cb.sum(
                cb.<Integer>selectCase()
                        .when(cb.equal(root.get("category"), ReceiptCategory.WITHDRAWAL), root.get("totalPrice"))
                        .otherwise(0)
        );
        Expression<Integer> salesDC = cb.sum(
                cb.<Integer>selectCase()
                        .when(cb.equal(root.get("category"), ReceiptCategory.SALES_DISCOUNT), root.get("totalPrice"))
                        .otherwise(0)
        );
        Expression<Integer> purchaseDC = cb.sum(
                cb.<Integer>selectCase()
                        .when(cb.equal(root.get("category"), ReceiptCategory.PURCHASE_DISCOUNT), root.get("totalPrice"))
                        .otherwise(0)
        );
        Expression<Integer> official = cb.sum(
                cb.<Integer>selectCase()
                        .when(cb.equal(root.get("category"), ReceiptCategory.MAINTENANCE_FEE), root.get("totalPrice"))
                        .otherwise(0)
        );

        // 4) multiselect로 '거래처이름' + '카테고리별 합산'
        //    별도 DTO에 매핑
        cq.multiselect(
                root.get("customer").get("customerName"), // or customerCode, etc
                sales,
                deposit,
                purchase,
                withdrawal,
                salesDC,
                purchaseDC,
                official
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
