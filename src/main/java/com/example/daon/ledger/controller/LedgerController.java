package com.example.daon.ledger.controller;

import com.example.daon.ledger.dto.LedgerRequest;
import com.example.daon.ledger.service.LedgerService;
import com.example.daon.receipts.model.ReceiptEntity;
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
    //품목별
    //--이 3개 한번에 합치기?

    public List<ReceiptEntity> getLedgers(@RequestBody LedgerRequest ledgerRequest) {
        return ledgerService.getLedgers(ledgerRequest);
    }

    //매출장
    //매입장
    //관리비원장
    //재고조사서
    //기타
}
