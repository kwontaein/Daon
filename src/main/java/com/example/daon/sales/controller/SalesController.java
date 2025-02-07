package com.example.daon.sales.controller;

import com.example.daon.sales.dto.request.EstimateRequest;
import com.example.daon.sales.dto.request.CustomerBillRequest;
import com.example.daon.sales.dto.request.ReceiptRequest;
import com.example.daon.sales.model.ReceiptEntity;
import com.example.daon.sales.service.SalesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 판매회계
 **/
@RestController
@RequiredArgsConstructor
public class SalesController {
    //전표-----------------------------
    private final SalesService salesService;

    /**
     * 조건부 전표 검색
     */
    @PostMapping("api/getReceipts")
    public List<ReceiptEntity> getReceipts(@RequestBody ReceiptRequest request) {
        //고객 아이디 ,품목 아이디 -> 이름 전달받으면 아이디 찾아서 넣는걸로 변경
        return salesService.getReceipts(request.getSearchSDate(), request.getSearchEDate(), request.getCustomerId(), request.getItemNumber());
    }

    @PostMapping("api/updateReceipt")
    public void updateReceipt(@RequestBody ReceiptRequest request) {
        salesService.updateReceipt(request);
    }

    @PostMapping("api/saveReceipts")
    public void saveReceipt(@RequestBody List<ReceiptRequest> requests) {
        System.out.println(requests.toString());
        salesService.saveReceipt(requests);
    }


    @PostMapping("api/deleteReceipt")
    public void deleteReceipt(@RequestBody ReceiptRequest request) {
        salesService.deleteReceipts(request.getIds());
    }

    //견적서관리-----------------------------------
    @PostMapping("api/getEstimates")
    public void getEstimates(@RequestBody EstimateRequest request) {
        salesService.getEstimates(request.getSearchSDate(), request.getSearchEDate(), request.getCustomerName(), request.getItemName());
    }

    //수정
    @PostMapping("api/updateEstimate")
    public void updateEstimate(@RequestBody EstimateRequest request) {
        salesService.updateTest(request);
    }
 
    //전표전환
    @PostMapping("api/estimatesPaid")
    public void estimatesPaid(@RequestBody EstimateRequest request) {
        salesService.estimatesPaid(request);
    }

    //미수미지급현황------------------------------------
    @PostMapping("api/getNoPaid")
    public void getNoPaid(@RequestBody CustomerBillRequest request) {
        //db 조건부 조회
        salesService.getCustomerBills(request);
    }

    //관리비관리---------------------------------------
    @GetMapping("api/getCost")
    public void getCost() {

    }

    @PostMapping("api/deleteCost")
    public void deleteCost() {

    }

    @PostMapping("api/updateCost")
    public void updateCost() {

    }


}
