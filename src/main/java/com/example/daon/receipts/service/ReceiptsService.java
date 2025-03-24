package com.example.daon.receipts.service;

import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.customer.repository.CustomerBillRepository;
import com.example.daon.customer.repository.CustomerRepository;
import com.example.daon.estimate.model.EstimateEntity;
import com.example.daon.estimate.repository.EstimateRepository;
import com.example.daon.global.service.GlobalService;
import com.example.daon.receipts.dto.request.ReceiptRequest;
import com.example.daon.receipts.dto.response.ReceiptResponse;
import com.example.daon.receipts.model.ReceiptCategory;
import com.example.daon.receipts.model.ReceiptEntity;
import com.example.daon.receipts.repository.ReceiptRepository;
import com.example.daon.stock.model.StockEntity;
import com.example.daon.stock.repository.StockRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
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

            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });

        return receiptEntities
                .stream()
                .map(globalService::convertToReceiptResponse)
                .collect(Collectors.toList());
    }

    //관리비 목록 불러오기
    public List<StockEntity> getMCList() {
        return null;
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
        ReceiptEntity receiptEntity = receiptRepository.save(receipt);
        request.setReceiptId(receiptEntity.getReceiptId());
    }


    /**
     * 전표 저장 및 수정 (단일 객체)
     */
    public void updateReceipt(ReceiptRequest receiptRequest) {
        saveOrUpdateReceipt(receiptRequest);
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

}
