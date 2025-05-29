package com.example.daon.receipts.controller;

import com.example.daon.receipts.dto.request.ReceiptRequest;
import com.example.daon.receipts.dto.response.ReceiptResponse;
import com.example.daon.receipts.model.DailyTotalEntity;
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
    public List<ReceiptResponse> getReceipts(@RequestBody ReceiptRequest receiptRequest) {
        return receiptsService.getReceipts(receiptRequest.getCategory(), receiptRequest.getSearchSDate(), receiptRequest.getSearchEDate(), receiptRequest.getCustomerId(), receiptRequest.getStockId());
    }

    @PostMapping("api/getReceiptsById")
    public List<ReceiptResponse> getReceiptsById(@RequestBody ReceiptRequest receiptRequest) {
        return receiptsService.getReceiptsById(receiptRequest.getReceiptIds());
    }


    @PostMapping("api/updateReceipt")
    public void updateReceipt(@RequestBody List<ReceiptRequest> receiptRequest) {
        receiptsService.updateReceipts(receiptRequest);
    }

    @PostMapping("api/saveReceipts")
    public void saveReceipt(@RequestBody List<ReceiptRequest> receiptRequests) {
        receiptsService.saveReceipts(receiptRequests);
    }

    @PostMapping("api/deleteReceipt")
    public void deleteReceipt(@RequestBody ReceiptRequest receiptRequest) {
        receiptsService.deleteReceipts(receiptRequest.getReceiptIds());
    }

    @PostMapping("api/getReceiptTotal")
    public DailyTotalEntity getReceiptTotal(@RequestBody ReceiptRequest receiptRequest) {
        return receiptsService.getReceiptTotal(receiptRequest.getSearchSDate());
    }

    @PostMapping("api/saveReceiptsToEstimate")
    public void saveReceiptsToEstimate(@RequestBody List<ReceiptRequest> receiptRequests) {
        receiptsService.saveReceiptsToEstimate(receiptRequests);
    }


}
