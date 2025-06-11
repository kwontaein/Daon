package com.example.daon.stock.controller;

import com.example.daon.stock.dto.request.StockCateRequest;
import com.example.daon.stock.dto.request.StockRequest;
import com.example.daon.stock.dto.response.PersonalStockResponse;
import com.example.daon.stock.dto.response.StockResponse;
import com.example.daon.stock.model.StockCate;
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

    @GetMapping("api/getAllStockList")
    public List<StockResponse> getAllStockList() {
        return stockService.getStockList(new StockRequest());
    }

    @PostMapping("api/getStockList")
    public List<StockResponse> getStockList(@RequestBody StockRequest stockRequest) {
        return stockService.getStockList(stockRequest);
    }

    @PostMapping("api/getStockById")
    public StockResponse getStockById(@RequestBody StockRequest stockRequest) {
        return stockService.getStockById(stockRequest);
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


    @GetMapping("api/getStockCateList")
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

    //개인이 갖고 있는 품목 갯수
    @PostMapping("api/getPersonalStock")
    public List<PersonalStockResponse> getPersonalStock(@RequestBody StockRequest stockRequest) {
        return stockService.getPersonalStock(stockRequest);
    }
}
