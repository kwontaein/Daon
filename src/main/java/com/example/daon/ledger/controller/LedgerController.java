package com.example.daon.ledger.controller;

import com.example.daon.ledger.dto.request.LedgerRequest;
import com.example.daon.ledger.dto.request.NoPaidRequest;
import com.example.daon.ledger.dto.response.LedgerResponse;
import com.example.daon.ledger.dto.response.NoPaidResponse;
import com.example.daon.ledger.dto.response.StockLedgerResponses;
import com.example.daon.ledger.service.LedgerService;
import com.example.daon.receipts.model.ReceiptCategory;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class LedgerController {
    private final LedgerService ledgerService;
    //원장출력

    //거래처별
    //복수거래처
    @PostMapping("api/getLedgers")
    public List<LedgerResponse> getLedgers(@RequestBody LedgerRequest ledgerRequest) {
        return ledgerService.getLedgers(ledgerRequest);
    }

    @PostMapping("api/getMultipleLedgers")
    public List<LedgerResponse> getMultipleLedgers(@RequestBody LedgerRequest ledgerRequest) {
        return ledgerService.getMultipleLedgers(ledgerRequest);
    }

    //품목별
    @PostMapping("api/getStockLedger")
    public List<LedgerResponse> getStockLedger(@RequestBody LedgerRequest ledgerRequest) {
        return ledgerService.getStockLedger(ledgerRequest);
    }

    //매출장
    @PostMapping("api/getSaleReceipt")
    public List<LedgerResponse> getSaleReceipt(@RequestBody LedgerRequest ledgerRequest) {
        return ledgerService.getSaleOrPurchaseReceipt(ledgerRequest, ReceiptCategory.SALES);
    }

    //매입장
    @PostMapping("api/getPurchaseReceipt")
    public List<LedgerResponse> getPurchaseReceipt(@RequestBody LedgerRequest ledgerRequest) {
        return ledgerService.getSaleOrPurchaseReceipt(ledgerRequest, ReceiptCategory.PURCHASE);
    }

    //관리비원장
    @PostMapping("api/getFeeReceipt")
    public List<LedgerResponse> getFeeReceipt(@RequestBody LedgerRequest ledgerRequest) {
        return ledgerService.getFeeReceipt(ledgerRequest);
    }

    //재고조사서
    @PostMapping("api/getStockSurvey")
    public StockLedgerResponses getStockSurvey(@RequestBody LedgerRequest ledgerRequest) {
        return ledgerService.getStockSurvey(ledgerRequest);
    }

    //기타
    @PostMapping("api/getExtraLedger")
    public List<LedgerResponse> getExtraLedger(@RequestBody LedgerRequest ledgerRequest) {
        return ledgerService.getExtraLedger(ledgerRequest);
    }

    //미수미지급
    @PostMapping("api/getNoPaid")
    public List<NoPaidResponse> getNoPaid(@RequestBody NoPaidRequest noPaidRequest) {
        return ledgerService.getCategorySumByCustomer(noPaidRequest);
    }
}
