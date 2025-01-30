package com.example.daon.stock.service;

import com.example.daon.stock.dto.request.StockRequest;
import com.example.daon.stock.model.StockEntity;
import com.example.daon.stock.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StockService {
    private final StockRepository stockRepository;

    public List<StockEntity> getStockList(StockRequest stockRequest) {
        return null;
    }
}
