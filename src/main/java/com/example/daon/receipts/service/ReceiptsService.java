package com.example.daon.receipts.service;

import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.estimate.model.EstimateEntity;
import com.example.daon.global.exception.ResourceInUseException;
import com.example.daon.global.service.ConvertResponseService;
import com.example.daon.global.service.GlobalService;
import com.example.daon.official.model.OfficialEntity;
import com.example.daon.receipts.dto.request.ReceiptRequest;
import com.example.daon.receipts.dto.response.ReceiptResponse;
import com.example.daon.receipts.model.DailyTotalEntity;
import com.example.daon.receipts.model.ReceiptCategory;
import com.example.daon.receipts.model.ReceiptEntity;
import com.example.daon.receipts.repository.DailyTotalRepository;
import com.example.daon.receipts.repository.ReceiptRepository;
import com.example.daon.stock.model.StockEntity;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReceiptsService {
    private final ReceiptRepository receiptRepository;
    private final ConvertResponseService convertResponseService;
    private final GlobalService globalService;
    private final DailyTotalRepository dailyTotalRepository;


    public List<ReceiptResponse> getReceipts(ReceiptCategory category, LocalDate startDate, LocalDate endDate, UUID customerId, UUID stockId) {
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
                predicates.add(criteriaBuilder.equal(root.get("customer").get("customerId"), customerId));
            }

            // 품목 조건
            if (stockId != null) {
                predicates.add(criteriaBuilder.equal(root.get("stock").get("stockId"), stockId));
            }
            //todo 정렬
            query.orderBy(criteriaBuilder.desc(root.get("timeStamp"))); //날짜순 정렬
            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });

        return receiptEntities
                .stream()
                .map(convertResponseService::convertToReceiptResponse)
                .collect(Collectors.toList());
    }

    // 전표 신규 저장 로직
    private void saveReceipt(ReceiptRequest request) {
        // 관련 엔티티 조회 (nullable 허용)
        EstimateEntity estimate = globalService.getEstimate(request.getEstimateId());
        CustomerEntity customer = globalService.getCustomer(request.getCustomerId());
        StockEntity stock = globalService.getStock(request.getStockId());
        OfficialEntity official = globalService.getOfficial(request.getOfficialId());

        // 요청으로부터 전표 엔티티 생성
        ReceiptEntity receipt = request.toEntity(estimate, customer, stock, official);

        // 수량과 단가를 기반으로 총액 계산
        if (request.getQuantity() != null && stock != null) {
            globalService.adjustStockQuantity(stock, request.getQuantity(), request.getCategory(), false); // 수량 차감
            BigDecimal tp = BigDecimal.valueOf(request.getQuantity()).multiply(stock.getOutPrice());
            receipt.setTotalPrice(tp); // 총액 설정
        }

        // 전표 저장 및 일일 총합 반영
        ReceiptEntity saved = receiptRepository.save(receipt);
        globalService.updateDailyTotal(saved.getTotalPrice(), saved.getCategory(), saved.getTimeStamp());

        // 생성된 전표 ID를 request에 반영
        request.setReceiptId(saved.getReceiptId());
    }

    // 기존 전표 수정 로직
    private void updateReceipt(ReceiptRequest request) {
        // 기존 전표 조회
        ReceiptEntity existing = receiptRepository.findById(request.getReceiptId()).orElse(null);
        if (existing == null) return;

        // 기존 총합 금액 롤백
        globalService.updateDailyTotal(existing.getTotalPrice().negate(), existing.getCategory(), existing.getTimeStamp());

        // 기존 수량 복원 (재고 원복)
        StockEntity oldStock = globalService.getStock(existing.getStock().getStockId());
        if (oldStock != null && existing.getQuantity() != null) {
            globalService.adjustStockQuantity(oldStock, existing.getQuantity(), existing.getCategory(), true);
        }

        // 변경 대상 엔티티 조회
        CustomerEntity customer = globalService.getCustomer(request.getCustomerId());
        StockEntity newStock = globalService.getStock(request.getStockId());

        // 기존 전표에 수정 내용 반영
        existing.updateFromRequest(request, customer, newStock);

        // 새로운 수량 적용
        if (newStock != null && request.getQuantity() != null) {
            globalService.adjustStockQuantity(newStock, request.getQuantity(), request.getCategory(), false);
        }

        // 새 총합 반영
        globalService.updateDailyTotal(request.getTotalPrice(), request.getCategory(), request.getTimeStamp());

        // 수정된 전표 저장
        receiptRepository.save(existing);
    }


    /**
     * 전표 수정 (단일 객체)
     */
    public void updateReceipts(List<ReceiptRequest> requests) {
        for (ReceiptRequest request : requests) {
            updateReceipt(request);
        }
    }

    /**
     * 전표 저장 (여러 객체)
     */
    public void saveReceipts(List<ReceiptRequest> requests) {
        for (ReceiptRequest request : requests) {
            request.setReceiptId(null);
            saveReceipt(request);
        }
    }

    public void deleteReceipts(List<UUID> ids) {
        try {
            List<ReceiptEntity> receiptEntities = receiptRepository.findAll((root, query, criteriaBuilder) -> {
                // 동적 조건을 조합하여 반환
                List<Predicate> predicates = new ArrayList<>();

                predicates.add(root.get("receiptId").in(ids));

                return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
            });

            for (ReceiptEntity receipt : receiptEntities) {
                globalService.updateDailyTotal(receipt.getTotalPrice().negate(), receipt.getCategory(), receipt.getTimeStamp());

                StockEntity stock = receipt.getStock(); // 연결된 재고 품목
                Integer quantity = receipt.getQuantity();
                ReceiptCategory category = receipt.getCategory();

                // 🔄 재고 수량 원복
                globalService.adjustStockQuantity(stock, quantity, category, true);
            }

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
                .map(convertResponseService::convertToReceiptResponse)
                .collect(Collectors.toList());
    }

    public void saveReceiptsToEstimate(List<ReceiptRequest> receiptRequests) {
    }
}
