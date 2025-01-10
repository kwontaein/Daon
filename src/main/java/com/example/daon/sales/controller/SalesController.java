package com.example.daon.sales.controller;

import com.example.daon.sales.dto.request.ReceiptRequest;
import com.example.daon.sales.model.ReceiptEntity;
import com.example.daon.sales.service.SalesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

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
    @GetMapping("api/getReceipts")
    public List<ReceiptEntity> getReceipts(ReceiptRequest request) {
        //고객 아이디 ,품목 아이디 -> 이름 전달받으면 아이디 찾아서 넣는걸로 변경
        return salesService.getReceipts(request.getSearchSDate(), request.getSearchEDate(), request.getCustomerName(), request.getItemName());
    }

    @PostMapping("api/saveReceipt")
    public void saveReceipt(ReceiptRequest request) {
        salesService.saveReceipt(request.toEntity());
    }

    @PostMapping("api/deleteReceipt")
    public void deleteReceipt(ReceiptRequest request) {
        salesService.deleteReceipts(request.getIds());
    }

    //견적서관리-----------------------------------
    @GetMapping("api/getEstimates")
    public void getEstimates() {

    }

    @PostMapping("api/estimatesPaid")
    public void estimatesPaid() {

    }

    //미수미지급현황------------------------------------
    @GetMapping("api/getNoPaid")
    public void getNoPaid() {

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
