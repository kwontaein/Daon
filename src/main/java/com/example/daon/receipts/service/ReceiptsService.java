package com.example.daon.receipts.service;

import com.example.daon.customer.model.CustomerBillEntity;
import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.customer.repository.CustomerBillRepository;
import com.example.daon.customer.repository.CustomerRepository;
import com.example.daon.estimate.model.EstimateEntity;
import com.example.daon.estimate.repository.EstimateRepository;
import com.example.daon.global.service.GlobalService;
import com.example.daon.receipts.dto.request.CustomerBillRequest;
import com.example.daon.receipts.dto.request.ReceiptRequest;
import com.example.daon.receipts.dto.response.ReceiptResponse;
import com.example.daon.receipts.model.ReceiptCategory;
import com.example.daon.receipts.model.ReceiptEntity;
import com.example.daon.receipts.repository.ReceiptRepository;
import com.example.daon.stock.model.StockEntity;
import com.example.daon.stock.repository.StockRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReceiptsService {

    private final EstimateRepository estimateRepository;
    private final ReceiptRepository receiptRepository;
    private final CustomerRepository customerRepository;
    private final CustomerBillRepository customerBillRepository;
    private final StockRepository stockRepository;
    private final GlobalService globalService;


    public List<ReceiptResponse> getReceipts(ReceiptCategory category, LocalDate startDate, LocalDate endDate, UUID customerId, UUID stockId) {
        List<ReceiptEntity> receiptEntities = receiptRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();

            if (!category.equals(ReceiptCategory.EX)) {
                predicates.add(criteriaBuilder.equal(root.get("customer"), category));
            }

            // 기간 조건
            if (startDate != null && endDate != null) {
                predicates.add(criteriaBuilder.between(root.get("timeStamp"), startDate.atStartOfDay(), endDate.atTime(23, 59, 59)));
            }

            // 거래처 조건
            if (customerId != null) {
                //거래처 얻기
                CustomerEntity customer = customerRepository.findById(customerId).orElse(null);
                predicates.add(criteriaBuilder.equal(root.get("customer"), customer));
            }

            // 품목 조건
            if (stockId != null) {
                StockEntity stock = stockRepository.findById(stockId).orElse(null);
                predicates.add(criteriaBuilder.equal(root.get("stock"), stock));
            }

            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });

        return receiptEntities
                .stream()
                .map(globalService::convertToReceiptResponse)
                .collect(Collectors.toList());
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
        StockEntity stock = stockRepository.findById(request.getStockId()).orElse(null);

        if (request.getReceiptId() != null) {
            ReceiptEntity receiptEntity = receiptRepository.findById(request.getReceiptId()).orElse(null);
            if (receiptEntity != null) {
                receiptEntity.updateFromRequest(request, customer, stock);
                return;
            }
        }

        //엔티티화
        ReceiptEntity receipt = request.toEntity(entity, customer, stock);
        //그리고 저장
        receiptRepository.save(receipt);
        //그 후 미수미지급 항목 업데이트
        updateCustomerBill(customer, receipt.getCategory(), receipt.getTotalPrice());
    }

    /**
     * 미수미지급을 위한 각 계산 통계
     *
     * @param customer 고객
     * @param type     전표 타입
     * @param price    가격
     */
    private void updateCustomerBill(CustomerEntity customer, ReceiptCategory type, int price) {
        CustomerBillEntity customerBillEntity = customerBillRepository.findByCustomer(customer).orElseThrow(() -> new RuntimeException("존재하지 않는 고객입니다."));
        //잔액 = 전기이월  + 매출액 - 수금액 + 매입 - 지급액 - 매출할인 + 매입할인
        //currentBalance = paymentAmount + purchaseAmount - paymentAmount + previousBalance + salesAmount - salesDiscount - collectionAmount + purchaseDiscount
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
        customerBillEntity.setCurrentBalance(0);
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
            request.setReceiptId(null);
            saveOrUpdateReceipt(request);
        }
    }

    public void deleteReceipts(List<UUID> ids) {
        receiptRepository.deleteAllById(ids);
    }


    /**
     * 미수미지급항목 검색
     */
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

    /**
     * 예시: 정렬 문자열에 따라 Sort 객체 만들기
     */
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

    //관리비 목록 불러오기
    public List<StockEntity> getMCList() {
        return null;
    }
}
