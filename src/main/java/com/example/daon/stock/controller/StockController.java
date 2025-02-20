package com.example.daon.stock.controller;

import com.example.daon.stock.dto.request.StockCateRequest;
import com.example.daon.stock.dto.request.StockRequest;
import com.example.daon.stock.model.StockCate;
import com.example.daon.stock.model.StockEntity;
import com.example.daon.stock.service.StockService;
import lombok.RequiredArgsConstructor;
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
        List<StockEntity> stockEntities;
        if (stockRequest.getReceiptCategory().equals("MAINTENANCE_FEE")) {
            stockEntities = stockService.getMCList(stockRequest);
        } else {
            stockEntities = stockService.getStockList(stockRequest);
        }
        return stockEntities;
    }

    //생성
    @PostMapping("api/saveStock")
    public void saveStock(@RequestBody StockRequest stockRequest) {
        stockService.saveStock(stockRequest);
    }


    //업데이트
    @PostMapping("api/updateStock")
    public void updateStock(@RequestBody StockRequest stockRequest) {
        stockService.updateStock(stockRequest);
    }

    //삭제
    @PostMapping("api/deleteStock")
    public void deleteStock(@RequestBody StockRequest stockRequest) {
        stockService.deleteStock(stockRequest);
    }


    @PostMapping("api/getStockCateList")
    public List<StockCate> getStockCateList() {
        return stockService.getStockCateList();
    }

    //생성
    @PostMapping("api/saveStockCate")
    public void saveStockCate(@RequestBody StockCateRequest stockCateRequest) {
        stockService.saveStockCate(stockCateRequest);
    }


    //업데이트
    @PostMapping("api/updateStockCate")
    public void updateStockCate(@RequestBody List<StockCateRequest> stockCateRequest) {
        stockService.updateStockCate(stockCateRequest);
    }

    //삭제
    @PostMapping("api/deleteStockCate")
    public void deleteStockCate(@RequestBody StockCateRequest stockCateRequest) {
        stockService.deleteStockCate(stockCateRequest);
    }
}
