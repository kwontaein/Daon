package com.example.daon.receipts.service;

import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.customer.repository.CustomerRepository;
import com.example.daon.estimate.model.EstimateEntity;
import com.example.daon.estimate.repository.EstimateRepository;
import com.example.daon.global.exception.ResourceInUseException;
import com.example.daon.global.service.GlobalService;
import com.example.daon.official.model.OfficialEntity;
import com.example.daon.official.repository.OfficialRepository;
import com.example.daon.receipts.dto.request.ReceiptRequest;
import com.example.daon.receipts.dto.response.ReceiptResponse;
import com.example.daon.receipts.model.DailyTotalEntity;
import com.example.daon.receipts.model.ReceiptCategory;
import com.example.daon.receipts.model.ReceiptEntity;
import com.example.daon.receipts.repository.DailyTotalRepository;
import com.example.daon.receipts.repository.ReceiptRepository;
import com.example.daon.stock.model.StockEntity;
import com.example.daon.stock.repository.StockRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
    private final OfficialRepository officialRepository;
    private final StockRepository stockRepository;
    private final DailyTotalRepository dailyTotalRepository;
    private final GlobalService globalService;


    public List<ReceiptResponse> getReceipts(ReceiptCategory category, LocalDate startDate, LocalDate endDate, UUID customerId, UUID stockId) {
        System.out.println("stockId : " + stockId);
        List<ReceiptEntity> receiptEntities = receiptRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();

            if (!category.equals(ReceiptCategory.EX)) {
                predicates.add(criteriaBuilder.equal(root.get("category"), category));
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
            //todo 정렬
            query.orderBy(criteriaBuilder.desc(root.get("timeStamp"))); //날짜순 정렬
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

        CustomerEntity customer = null;
        if (request.getCustomerId() != null) {
            customer = customerRepository.findById(request.getCustomerId()).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 아이디입니다."));
        }

        StockEntity stock = null;
        OfficialEntity official = null;

        if (request.getStockId() != null) {
            stock = stockRepository.findById(request.getStockId()).orElseThrow(() -> new RuntimeException("존재하지 않는 품목입니다."));
            stock.setQuantity(stock.getQuantity());
        }

        if (request.getOfficialId() != null) {
            official = officialRepository.findById(request.getOfficialId()).orElse(null);
        }

        if (request.getReceiptId() != null) {
            ReceiptEntity receiptEntity = receiptRepository.findById(request.getReceiptId()).orElse(null);
            if (receiptEntity != null) {
                // 기존 총합 롤백
                updateDailyTotal(receiptEntity.getTotalPrice().negate(), receiptEntity.getCategory(), receiptEntity.getTimeStamp());

                // ✅ 기존 수량 롤백
                if (stock != null && receiptEntity.getQuantity() != null) {
                    adjustStockQuantity(stock, receiptEntity.getQuantity(), receiptEntity.getCategory(), true); // true: rollback
                }

                // 총합 업데이트
                updateDailyTotal(request.getTotalPrice(), request.getCategory(), request.getTimeStamp());

                receiptEntity.updateFromRequest(request, customer, stock);

                // ✅ 새로운 수량 반영
                if (stock != null && request.getQuantity() != null) {
                    adjustStockQuantity(stock, request.getQuantity(), request.getCategory(), false); // false: apply new
                }
                receiptRepository.save(receiptEntity);
                return;
            }
        }

        //엔티티화
        ReceiptEntity receipt = request.toEntity(entity, customer, stock, official);

        if (request.getQuantity() != null && stock != null) {
            adjustStockQuantity(stock, request.getQuantity(), request.getCategory(), false); // 신규 적용
            BigDecimal quantity = BigDecimal.valueOf(request.getQuantity());
            BigDecimal tp = quantity.multiply(stock.getOutPrice());
            receipt.setTotalPrice(tp);
        }

        //그리고 저장
        ReceiptEntity receiptEntity = receiptRepository.save(receipt);
        //새로운 값 더하기
        updateDailyTotal(receiptEntity.getTotalPrice(), receiptEntity.getCategory(), receiptEntity.getTimeStamp());
        request.setReceiptId(receiptEntity.getReceiptId());
    }

    //재고 수량 업데이트
    private void adjustStockQuantity(StockEntity stock, Integer quantity, ReceiptCategory category, boolean isRollback) {
        if (quantity == null || stock == null || category == null) return;

        int currentStock = stock.getQuantity();
        int q = quantity;

        switch (category) {
            case PURCHASE:
            case RETURN_IN:
                stock.setQuantity(currentStock + (isRollback ? -q : q)); // 입고
                break;

            case SALES:
            case RETURN_OUT:
                stock.setQuantity(currentStock + (isRollback ? q : -q)); // 출고
                break;

            // 기타 카테고리는 재고 변화 없음
            default:
                break;
        }

        stockRepository.save(stock);
    }

    /**
     * 전표 저장 및 수정 (단일 객체)
     */
    public void updateReceipt(List<ReceiptRequest> requests) {
        for (ReceiptRequest request : requests) {
            saveOrUpdateReceipt(request);
        }
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
        try {
            receiptRepository.deleteAllById(ids);
            receiptRepository.flush();
        } catch (DataIntegrityViolationException e) {
            // 외래키 제약 조건 위반 처리
            throw new ResourceInUseException("전표를 삭제할 수 없습니다. 관련된 데이터가 존재합니다.", e);
        }
    }

    //일일정산
    public DailyTotalEntity getReceiptTotal(LocalDate searchDate) {
        if (searchDate == null) {
            searchDate = LocalDate.now();
        }
        DailyTotalEntity dailyTotalEntity = dailyTotalRepository.findDailyTotalEntityByDate(searchDate).orElse(null);

        if (dailyTotalEntity == null) {
            DailyTotalEntity resentDailyTotalEntity = dailyTotalRepository.findTopByDateBeforeOrderByDateDesc(searchDate).orElseThrow(null);
            dailyTotalEntity = new DailyTotalEntity(
                    null,
                    resentDailyTotalEntity.getRemainTotal(),
                    LocalDate.now(),
                    BigDecimal.ZERO,
                    BigDecimal.ZERO,
                    BigDecimal.ZERO,
                    BigDecimal.ZERO,
                    BigDecimal.ZERO,
                    resentDailyTotalEntity.getRemainTotal());
        }
        return dailyTotalEntity;
    }

    //일일정산 업데이트
    public void updateDailyTotal(BigDecimal count, ReceiptCategory category, LocalDateTime date) {
        //+전일잔고 -매입액 +매출액 -수금액 +지급액 -관리비 = 잔액
        DailyTotalEntity dailyTotalEntity = dailyTotalRepository.findDailyTotalEntityByDate(date.toLocalDate()).orElse(null);

        if (dailyTotalEntity == null) {
            DailyTotalEntity resentDailyTotalEntity = dailyTotalRepository.findTopByDateBeforeOrderByDateDesc(date.toLocalDate()).orElseThrow(null);
            dailyTotalEntity = new DailyTotalEntity(
                    null,
                    resentDailyTotalEntity.getRemainTotal(),
                    LocalDate.now(),
                    BigDecimal.ZERO,
                    BigDecimal.ZERO,
                    BigDecimal.ZERO,
                    BigDecimal.ZERO,
                    BigDecimal.ZERO,
                    resentDailyTotalEntity.getRemainTotal());
        }

        switch (category) {
            case SALES, SALES_DISCOUNT -> dailyTotalEntity.setSales(dailyTotalEntity.getSales().add(count));
            case PURCHASE, PURCHASE_DISCOUNT -> dailyTotalEntity.setPurchase(dailyTotalEntity.getPurchase().add(count));
            case DEPOSIT -> dailyTotalEntity.setDeposit(dailyTotalEntity.getDeposit().add(count));
            case WITHDRAWAL -> dailyTotalEntity.setWithdrawal(dailyTotalEntity.getWithdrawal().add(count));
            case MAINTENANCE_FEE, OPERATING_PROFIT ->
                    dailyTotalEntity.setOfficial(dailyTotalEntity.getOfficial().add(count));
        }

        BigDecimal sales = dailyTotalEntity.getBeforeTotal();
        BigDecimal purchase = dailyTotalEntity.getBeforeTotal();
        BigDecimal deposit = dailyTotalEntity.getBeforeTotal();
        BigDecimal withdrawal = dailyTotalEntity.getBeforeTotal();
        BigDecimal official = dailyTotalEntity.getBeforeTotal();
        //현잔액 = 전일잔액 + 나머지
        BigDecimal total = dailyTotalEntity.getBeforeTotal()
                .add(sales)
                .add(purchase)
                .add(deposit)
                .add(withdrawal)
                .add(official);

        dailyTotalEntity.setRemainTotal(total);

        dailyTotalRepository.save(dailyTotalEntity);
    }

    public List<ReceiptResponse> getReceiptsById(List<UUID> receiptIds) {
        List<ReceiptEntity> receiptEntities = receiptRepository.findAll((root, query, criteriaBuilder) -> {
            CriteriaBuilder.In<UUID> inClause = criteriaBuilder.in(root.get("receiptId"));
            for (UUID id : receiptIds) {
                inClause.value(id);
            }
            return inClause;
        });
        return receiptEntities
                .stream()
                .map(globalService::convertToReceiptResponse)
                .collect(Collectors.toList());
    }

    public void saveReceiptsToEstimate(List<ReceiptRequest> receiptRequests) {
    }
}
