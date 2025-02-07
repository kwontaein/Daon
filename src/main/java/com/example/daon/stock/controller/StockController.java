package com.example.daon.stock.controller;

import com.example.daon.stock.dto.request.StockRequest;
import com.example.daon.stock.model.StockEntity;
import com.example.daon.stock.service.StockService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 품목재고
 */
@RestController
@RequiredArgsConstructor
public class StockController {

    private final StockService stockService;

    @PostMapping("api/getStockList")
    public List<StockEntity> getStockList(@RequestBody StockRequest stockRequest) {
        System.out.println("실행");
        return stockService.getStockList(stockRequest);
    }

    //업데이트 및 생성
    @PostMapping("api/saveStock")
    public void saveStock(@RequestBody StockRequest stockRequest) {
        stockService.saveStock(stockRequest);
    }
}
