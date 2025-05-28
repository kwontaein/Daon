package com.example.daon.ledger.service;

import com.example.daon.customer.model.AffiliationEntity;
import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.customer.repository.AffiliationRepository;
import com.example.daon.customer.repository.CustomerRepository;
import com.example.daon.global.service.GlobalService;
import com.example.daon.ledger.dto.request.LedgerRequest;
import com.example.daon.ledger.dto.request.NoPaidRequest;
import com.example.daon.ledger.dto.response.LedgerResponse;
import com.example.daon.ledger.dto.response.NoPaidResponse;
import com.example.daon.ledger.dto.response.StockLedgerResponses;
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

import java.math.BigDecimal;
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
            StockEntity stock = stockRepository.findById(ledgerRequest.getStockId()).orElseThrow(() -> new RuntimeException("존재하지 않는 품목입니다."));
            predicates.add(criteriaBuilder.equal(root.get("stock"), stock));
        }
    }

    //원장조회
    public List<LedgerResponse> getLedgers(LedgerRequest ledgerRequest) {
        List<ReceiptEntity> receiptEntities = receiptRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();
            addAllPredicate(ledgerRequest, criteriaBuilder, root, predicates);

            // 전표 선택 옵션 추가
            addCategoryPredicates(ledgerRequest, root, predicates);
            query.orderBy(criteriaBuilder.asc(root.get("timeStamp")));
            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });

        return receiptEntities.stream().map(globalService::convertToLedgerResponse).collect(Collectors.toList());
    }

    //복수거래처
    public List<LedgerResponse> getMultipleLedgers(LedgerRequest ledgerRequest) {
        List<ReceiptEntity> receiptEntities = receiptRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();
            addAllPredicate(ledgerRequest, criteriaBuilder, root, predicates);

            if (ledgerRequest.getCustomerIds() != null && !ledgerRequest.getCustomerIds().isEmpty()) {
                predicates.add(root.get("customer").get("customerId").in(ledgerRequest.getCustomerIds()));
            }

            // 전표 선택 옵션 추가
            addCategoryPredicates(ledgerRequest, root, predicates);
            query.orderBy(criteriaBuilder.desc(root.get("timeStamp")));
            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });

        return receiptEntities.stream().map(globalService::convertToLedgerResponse).collect(Collectors.toList());
    }


    // 카테고리에 따른 분류
    private void addCategoryPredicates(LedgerRequest ledgerRequest, Root<ReceiptEntity> root, List<Predicate> predicates) {
        List<ReceiptCategory> selectedCategories = new ArrayList<>();

        if (ledgerRequest.isDeposit()) selectedCategories.add(ReceiptCategory.DEPOSIT);
        if (ledgerRequest.isSales()) selectedCategories.add(ReceiptCategory.SALES);
        if (ledgerRequest.isSalesDiscount()) selectedCategories.add(ReceiptCategory.SALES_DISCOUNT);
        if (ledgerRequest.isPurchase()) selectedCategories.add(ReceiptCategory.PURCHASE);
        if (ledgerRequest.isPurchaseDiscount()) selectedCategories.add(ReceiptCategory.PURCHASE_DISCOUNT);
        if (ledgerRequest.isReturnIn()) selectedCategories.add(ReceiptCategory.RETURN_IN);
        if (ledgerRequest.isReturnOut()) selectedCategories.add(ReceiptCategory.RETURN_OUT);
        if (ledgerRequest.isWithdrawal()) selectedCategories.add(ReceiptCategory.WITHDRAWAL);

        if (!selectedCategories.isEmpty()) {
            predicates.add(root.get("category").in(selectedCategories));
        }
    }


    //품목별원장
    public List<LedgerResponse> getStockLedger(LedgerRequest ledgerRequest) {
        //날짜 계정 거래처	적요	단가	판매	반품	매입	반출	재고	금액
        List<ReceiptEntity> receiptEntities = receiptRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();
            addAllPredicate(ledgerRequest, criteriaBuilder, root, predicates);
            //해당 품목의 전표 검색
            if (ledgerRequest.getStockId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("stock").get("stockId"), ledgerRequest.getStockId()));
            }

            addCategoryPredicates(ledgerRequest, root, predicates);
            // 동적 조건을 조합하여 반환
            query.orderBy(criteriaBuilder.desc(root.get("timeStamp")));
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
        return receiptEntities.stream().map(globalService::convertToLedgerResponse).collect(Collectors.toList());
    }

    public List<LedgerResponse> getSaleOrPurchaseReceipt(LedgerRequest ledgerRequest, ReceiptCategory receiptCategory) {
        //날짜 계정 거래처	품명	규격	적요	수량	단가	합계금액
        List<ReceiptEntity> receiptEntities = receiptRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();
            addAllPredicate(ledgerRequest, criteriaBuilder, root, predicates);
            predicates.add(criteriaBuilder.equal(root.get("category"), receiptCategory));
            if (ledgerRequest.getStockId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("stock").get("stockId"), ledgerRequest.getStockId()));
            }
            if (ledgerRequest.getCustomerId() != null) {
                // 단일 거래처 ID로 필터
                predicates.add(criteriaBuilder.equal(root.get("customer").get("customerId"), ledgerRequest.getCustomerId()));
            }
            query.orderBy(criteriaBuilder.desc(root.get("timeStamp")));
            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
        return receiptEntities.stream().map(globalService::convertToLedgerResponse).collect(Collectors.toList());
    }


    //관리비원장
    public List<LedgerResponse> getFeeReceipt(LedgerRequest ledgerRequest) {
        //날짜 계정 품명 적요 합계
        List<ReceiptEntity> receiptEntities = receiptRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(criteriaBuilder.equal(root.get("category"), ReceiptCategory.MAINTENANCE_FEE));
            query.orderBy(criteriaBuilder.desc(root.get("timeStamp")));
            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));

        });
        return receiptEntities.stream().map(globalService::convertToLedgerResponse).collect(Collectors.toList());
    }

    //재고조사서
    public StockLedgerResponses getStockSurvey(LedgerRequest ledgerRequest) {
        List<StockEntity> stockEntities = stockRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();

            if (ledgerRequest.getStockCate() != null) {
                predicates.add(criteriaBuilder.equal(root.get("category").get("stockCateId"), ledgerRequest.getStockCateId()));
            }
            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });

        // 전체 수량 합산
        int totalQuantity = stockEntities.stream()
                .mapToInt(StockEntity::getQuantity)
                .sum();

        // 전체 금액 합산 (수량 * 단가)
        BigDecimal totalAmount = stockEntities.stream()
                .map(stock -> stock.getOutPrice().multiply(BigDecimal.valueOf(stock.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        StockLedgerResponses stockLedgerResponses = new StockLedgerResponses();

        stockLedgerResponses.setStockLedgerResponses(
                stockEntities.stream()
                        .map(globalService::convertToStockLedgerResponse)
                        .collect(Collectors.toList()));

        stockLedgerResponses.setTotalQuantity(totalQuantity);
        stockLedgerResponses.setTotalAmount(totalAmount);

        return stockLedgerResponses;
    }


    //넌 일단 보류 - 기타원장
    public List<LedgerResponse> getExtraLedger(LedgerRequest ledgerRequest) {
        System.out.println(ledgerRequest);
        List<ReceiptEntity> receiptEntities = receiptRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();

            if (ledgerRequest.getSearchSDate() != null && ledgerRequest.getSearchEDate() != null) {
                predicates.add(criteriaBuilder.between(root.get("timeStamp"), ledgerRequest.getSearchSDate(), ledgerRequest.getSearchEDate()));
            }

            if (ledgerRequest.getCustomerId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("customer").get("customerId"), ledgerRequest.getCustomerId()));
            }

            if (ledgerRequest.getStockId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("stock").get("stockId"), ledgerRequest.getStockId()));
            }

            addCategoryPredicates(ledgerRequest, root, predicates);
            query.orderBy(criteriaBuilder.desc(root.get("timeStamp")));
            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
        System.out.println(receiptEntities.size());
        return receiptEntities.stream().map(globalService::convertToLedgerResponse).collect(Collectors.toList());
    }


    public static Specification<ReceiptEntity> betweenTimeStamp(LocalDateTime start, LocalDateTime end) {
        return (root, query, cb) -> cb.between(root.get("timeStamp"), start, end);
    }

    /**
     * 특정 기간 사이의 전표 중,
     * 거래처별로 카테고리1~6 totalPrice 합계를 구하여 반환.
     * 전기이월? -> 그 이전까지의 값 계산...?
     *
     * @return
     */
    public List<NoPaidResponse> getCategorySumByCustomer(NoPaidRequest noPaidRequest) {
        System.out.println(noPaidRequest);
        // 1) CriteriaBuilder, CriteriaQuery, Root 준비
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<NoPaidResponse> cq = cb.createQuery(NoPaidResponse.class);
        Root<ReceiptEntity> root = cq.from(ReceiptEntity.class);

        // 2) 동적 조건(where) Spec과 결합
        //    스펙은 Predicate를 리턴하므로, 이것을 쿼리에 적용
        Specification<ReceiptEntity> spec = (root1, query, cb1) -> cb1.conjunction(); // 항상 true인 조건

        // 날짜 범위 조건 추가
        spec = spec.and(betweenTimeStamp(noPaidRequest.getSearchSDate(), noPaidRequest.getSearchEDate()));

        // 고객 이름 조건 추가
        if (noPaidRequest.getCustomerId() != null) {
            spec = spec.and((root1, query, cb1) ->
                    cb1.equal(root1.get("customer").get("customerId"), noPaidRequest.getCustomerId())
            );
        }
        //TODO 고객 분류를 선택하지 않으면 아무것도 나오지 않는 오류 발생
        /*if (noPaidRequest.getCustomerCate() != null) {
            spec = spec.and((root1, query, cb1) ->
                    cb1.equal(root1.get("customer").get("category"), noPaidRequest.getCustomerCate())
            );
        }*/

        Predicate specPredicate = spec.toPredicate(root, cq, cb);


        // 3) 카테고리별 CASE WHEN sum(...) Expression들 정의

        //매출
        Expression<Integer> sales = cb.sum(
                cb.<Integer>selectCase()
                        .when(cb.equal(root.get("category"), ReceiptCategory.SALES), root.get("totalPrice"))
                        .otherwise(0)
        );
        //출금
        Expression<Integer> deposit = cb.sum(
                cb.<Integer>selectCase()
                        .when(cb.equal(root.get("category"), ReceiptCategory.DEPOSIT), root.get("totalPrice"))
                        .otherwise(0)
        );
        //매입
        Expression<Integer> purchase = cb.sum(
                cb.<Integer>selectCase()
                        .when(cb.equal(root.get("category"), ReceiptCategory.PURCHASE), root.get("totalPrice"))
                        .otherwise(0)
        );
        //입금
        Expression<Integer> withdrawal = cb.sum(
                cb.<Integer>selectCase()
                        .when(cb.equal(root.get("category"), ReceiptCategory.WITHDRAWAL), root.get("totalPrice"))
                        .otherwise(0)
        );
        //매출할인
        Expression<Integer> salesDC = cb.sum(
                cb.<Integer>selectCase()
                        .when(cb.equal(root.get("category"), ReceiptCategory.SALES_DISCOUNT), root.get("totalPrice"))
                        .otherwise(0)
        );
        //매입할인
        Expression<Integer> purchaseDC = cb.sum(
                cb.<Integer>selectCase()
                        .when(cb.equal(root.get("category"), ReceiptCategory.PURCHASE_DISCOUNT), root.get("totalPrice"))
                        .otherwise(0)
        );
        //관리비
        Expression<Integer> official = cb.sum(
                cb.<Integer>selectCase()
                        .when(cb.equal(root.get("category"), ReceiptCategory.MAINTENANCE_FEE), root.get("totalPrice"))
                        .otherwise(0)
        );


        //+전기이월 +매출액 -수금액 -매입액 +지급액 -매출할인액 +매입할인액 잔액
        Expression<Integer> currentBalance = cb.sum(sales, deposit);            // 매출 + 출금
        currentBalance = cb.diff(currentBalance, purchase);                              // (매출 + 출금) - 매입
        currentBalance = cb.diff(currentBalance, withdrawal);                            // (매출 + 출금 - 매입) - 입금
        currentBalance = cb.sum(currentBalance, salesDC);                                // (매출 + 출금 - 매입 - 입금) + 매출할인
        currentBalance = cb.diff(currentBalance, purchaseDC);                            // (매출 + 출금 - 매입 - 입금 + 매출할인) - 매입할인
        currentBalance = cb.sum(currentBalance, official);                               // (매출 + 출금 - 매입 - 입금 + 매출할인 - 매입할인) + 관리비
        currentBalance = cb.sum(currentBalance, root.get("customer").get("remainCost"));   // (매출 + 출금 - 매입 - 입금 + 매출할인 - 매입할인) + 관리비 + 전기이월

        // 4) multiselect로 '거래처이름' + '카테고리별 합산'
        //    별도 DTO에 매핑
        cq.multiselect(
                root.get("customer").get("customerName"), // or customerCode, etc
                root.get("customer").get("remainCost"), //전기이월
                sales,
                deposit,
                purchase,
                withdrawal,
                salesDC,
                purchaseDC,
                official,
                currentBalance
        );

        // 5) where, groupBy, orderBy 등 설정
        cq.where(specPredicate);
        cq.groupBy(root.get("customer").get("customerName"), root.get("customer").get("remainCost"));
        cq.orderBy(cb.asc(currentBalance)); // 필요 시

        // 6) 최종 쿼리 실행
        System.out.println(em.createQuery(cq).getResultList());
        return em.createQuery(cq).getResultList();
    }


}
