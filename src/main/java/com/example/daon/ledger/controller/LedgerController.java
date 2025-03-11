package com.example.daon.ledger.controller;

import com.example.daon.ledger.dto.request.LedgerRequest;
import com.example.daon.ledger.service.LedgerService;
import com.example.daon.receipts.model.ReceiptEntity;
import com.example.daon.stock.model.StockEntity;
import lombok.RequiredArgsConstructor;
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
    public List<ReceiptEntity> getLedgers(@RequestBody LedgerRequest ledgerRequest) {
        return ledgerService.getLedgers(ledgerRequest);
    }

    //품목별
    public List<ReceiptEntity> getStockLedger(@RequestBody LedgerRequest ledgerRequest) {
        return ledgerService.getStockLedger(ledgerRequest);
    }

    //매출장
    public List<ReceiptEntity> getSaleReceipt(@RequestBody LedgerRequest ledgerRequest) {
        return ledgerService.getSaleReceipt(ledgerRequest);
    }

    //매입장
    public List<ReceiptEntity> getPurchaseReceipt(@RequestBody LedgerRequest ledgerRequest) {
        return ledgerService.getPurchaseReceipt(ledgerRequest);
    }

    //관리비원장
    public List<ReceiptEntity> getFeeReceipt(@RequestBody LedgerRequest ledgerRequest) {
        return ledgerService.getFeeReceipt(ledgerRequest);
    }

    //재고조사서
    public List<StockEntity> getStockSurvey(@RequestBody LedgerRequest ledgerRequest) {
        return ledgerService.getStockSurvey(ledgerRequest);
    }

    //기타
    public List<ReceiptEntity> getExtraLedger(@RequestBody LedgerRequest ledgerRequest) {
        return ledgerService.getExtraLedger(ledgerRequest);
    }
}
