package com.example.daon.stock.service;

import com.example.daon.global.service.GlobalService;
import com.example.daon.stock.dto.request.StockCateRequest;
import com.example.daon.stock.dto.request.StockRequest;
import com.example.daon.stock.dto.response.StockResponse;
import com.example.daon.stock.model.StockCate;
import com.example.daon.stock.model.StockEntity;
import com.example.daon.stock.repository.StockCateRepository;
import com.example.daon.stock.repository.StockRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StockService {
    private final StockRepository stockRepository;
    private final GlobalService globalService;
    private final StockCateRepository stockCateRepository;


    //품목 목록 불러오기
    public List<StockResponse> getStockList(StockRequest stockRequest) {
        List<StockEntity> stockEntities = stockRepository.findAll((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 분류 (category) 검색
            if (stockRequest.getCategory() != null) {
                StockCate stockCate = stockCateRepository.findById(stockRequest.getCategory()).orElse(null);
                if (stockCate != null) {
                    predicates.add(criteriaBuilder.equal(root.get("category"), stockCate));
                }
            } else {//분류가 없다면 관리비를 제외한 모든 것 검색
                StockCate stockCate = stockCateRepository.findByStockCateName("관리비").orElse(null);
                predicates.add(criteriaBuilder.notEqual(root.get("category"), stockCate));
            }

            // 이름 (name) 검색
            if (stockRequest.getProductName() != null && !stockRequest.getProductName().trim().isEmpty()) {
                predicates.add(criteriaBuilder.like(root.get("productName"), "%" + stockRequest.getProductName() + "%"));
            }

            // 고객명 부분 검색 (customerName 이 비어있지 않을 경우)
            if (stockRequest.getProductName() != null && !stockRequest.getProductName().trim().isEmpty()) {
                // customerName 이 비어있지 않을 때 OR 조건 사용
                predicates.add(
                        criteriaBuilder.or(
                                criteriaBuilder.like(root.get("productName"), "%" + stockRequest.getProductName() + "%")
                                // 필요한 경우 아래와 같이 다른 조건을 함께 OR로 묶을 수 있음
                                , criteriaBuilder.like(root.get("modelName"), "%" + stockRequest.getProductName() + "%")
                        )
                );
            }
            if (stockRequest.isCondition()) {
                // 재고 유무 여부(remain)
                if (stockRequest.isRemain()) {
                    // 0이 아닌 재고 -> notEqual 또는 greaterThan(0보다 큰) 등 자유롭게 선택
                    predicates.add(criteriaBuilder.greaterThan(root.get("quantity"), 0));
                }
                //재고사용 / 재고사용안함
                if (stockRequest.isStockUseEa()) {
                    predicates.add(criteriaBuilder.equal(root.get("stockUseEa"), stockRequest.isStockUseEa()));
                }
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });

        return stockEntities.stream().map(globalService::convertToStockResponse).collect(Collectors.toList());
    }

    //관리비 목록 불러오기
    public List<StockResponse> getMCList(StockRequest stockRequest) {
        List<StockEntity> stockEntities = stockRepository.findAll((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 분류가 관리비인 것만 검색
            StockCate stockCate = stockCateRepository.findByStockCateName("관리비").orElse(null);
            predicates.add(criteriaBuilder.notEqual(root.get("category"), stockCate));

            // 이름 (name) 검색
            if (stockRequest.getProductName() != null && !stockRequest.getProductName().trim().isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("productName"), stockRequest.getProductName()));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });

        return stockEntities.stream().map(globalService::convertToStockResponse).collect(Collectors.toList());
    }


    // 생성
    @Transactional
    public void saveStock(StockRequest stockRequest) {
        // 1) 카테고리 조회
        StockCate stockCate = stockCateRepository.findById(stockRequest.getCategory())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 카테고리입니다."));

        System.out.println(stockRequest.toString());
        // 새로 생성
        StockEntity newStock = stockRequest.toEntity(stockCate);
        stockRepository.save(newStock);
    }

    //업데이트
    public void updateStock(StockRequest stockRequest) {
        StockCate stockCate = stockCateRepository.findById(stockRequest.getCategory())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 카테고리입니다."));
        // 2) 기존 재고 존재 여부 확인
        UUID stockId = stockRequest.getStockId();
        // stockId가 null이면 "새로 생성"으로 처리한다고 가정
        if (stockId != null) {
            // 업데이트 로직
            StockEntity existingStock = stockRepository.findById(stockId)
                    .orElse(null);

            if (existingStock != null) {
                // 이미 존재하면 필요한 필드만 업데이트
                existingStock.updateFromRequest(stockRequest, stockCate);
                // 실제로는 existingStock가 영속 상태이므로 save() 호출 없이도 업데이트 가능
                // 하지만 명시적으로 호출해줘도 문제는 없다.
                stockRepository.save(existingStock);
            }
        }
    }

    @Transactional
    public void deleteStock(StockRequest stockRequest) {
        stockRepository.deleteById(stockRequest.getStockId());
    }

    public List<StockCate> getStockCateList() {
        return stockCateRepository.findAll();
    }

    public void saveStockCate(StockCateRequest stockCateRequest) {
        stockCateRepository.save(stockCateRequest.toEntity());
    }

    public void updateStockCate(List<StockCateRequest> stockCateRequests) {
        for (StockCateRequest stockCateRequest : stockCateRequests) {
            StockCate stockCate = stockCateRepository.findById(stockCateRequest.getStockCateId()).orElse(null);
            stockCate.setStockCateName(stockCateRequest.getStockCateName());
            stockCateRepository.save(stockCate);
        }
    }

    public void deleteStockCate(StockCateRequest stockCateRequest) {
        stockCateRepository.deleteById(stockCateRequest.getStockCateId());
    }
}
