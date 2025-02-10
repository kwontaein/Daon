package com.example.daon.stock.service;

import com.example.daon.stock.dto.request.StockRequest;
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

@Service
@RequiredArgsConstructor
public class StockService {
    private final StockRepository stockRepository;
    private final StockCateRepository stockCateRepository;

    public List<StockEntity> getStockList(StockRequest stockRequest) {
        return stockRepository.findAll((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 분류 (category) 검색
            if (stockRequest.getCategory() != null) {
                StockCate stockCate = stockCateRepository.findById(stockRequest.getCategory()).orElse(null);
                if (stockCate != null) {
                    predicates.add(criteriaBuilder.equal(root.get("category"), stockCate));
                }
            } else {//분류가 없다면 관리비를 제외한 모든 것 검색
                StockCate stockCate = stockCateRepository.findByCateKey("MC").orElse(null);
                predicates.add(criteriaBuilder.notEqual(root.get("category"), stockCate));
            }


            // 이름 (name) 검색
            if (stockRequest.getName() != null && !stockRequest.getName().trim().isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("name"), stockRequest.getName()));
            }

            // 재고 유무 여부(remain)
            if (stockRequest.isRemain()) {
                // 0이 아닌 재고 -> notEqual 또는 greaterThan(0보다 큰) 등 자유롭게 선택
                predicates.add(criteriaBuilder.greaterThan(root.get("quantity"), 0));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }

    public List<StockEntity> getMCList(StockRequest stockRequest) {
        return stockRepository.findAll((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 분류가 관리비인 것만 검색
            StockCate stockCate = stockCateRepository.findByCateKey("MC").orElse(null);
            predicates.add(criteriaBuilder.notEqual(root.get("category"), stockCate));

            // 이름 (name) 검색
            if (stockRequest.getName() != null && !stockRequest.getName().trim().isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("name"), stockRequest.getName()));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }


    //업데이트 및 생성
    @Transactional
    public void saveStock(StockRequest stockRequest) {
        StockCate stockCate = stockCateRepository.findById(stockRequest.getCategory()).orElse(null);
        stockRepository.save(stockRequest.toEntity(stockCate));
    }
}
