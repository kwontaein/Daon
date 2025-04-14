package com.example.daon.ledger.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StockLedgerResponse {
    //품명
    private String productName;
    //모델명
    private String modelName;
    //입고가
    private BigDecimal inPrice;
    //소비가
    private BigDecimal outPrice;
    //재고
    private int quantity;
}
