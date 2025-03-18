package com.example.daon.receipts.controller;

import com.example.daon.receipts.dto.request.ReceiptRequest;
import com.example.daon.receipts.dto.response.ReceiptResponse;
import com.example.daon.receipts.service.ReceiptsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 판매회계
 **/
@RestController
@RequiredArgsConstructor
public class ReceiptsController {
    //전표-----------------------------
    private final ReceiptsService receiptsService;

    /**
     * 조건부 전표 검색
     */
    @PostMapping("api/getReceipts")
    public List<ReceiptResponse> getReceipts(@RequestBody ReceiptRequest request) {
        return receiptsService.getReceipts(request.getSearchSDate(), request.getSearchEDate(), request.getCustomerId(), request.getStockId());
    }

    @PostMapping("api/updateReceipt")
    public void updateReceipt(@RequestBody ReceiptRequest request) {
        receiptsService.updateReceipt(request);
    }

    @PostMapping("api/saveReceipts")
    public void saveReceipt(@RequestBody List<ReceiptRequest> requests) {
        System.out.println(requests.toString());
        receiptsService.saveReceipt(requests);
    }

    @PostMapping("api/deleteReceipt")
    public void deleteReceipt(@RequestBody ReceiptRequest request) {
        receiptsService.deleteReceipts(request.getIds());
    }

}
