package com.example.daon.ledger.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StockLedgerResponses {
    //재고조사목록
    private List<StockLedgerResponse> stockLedgerResponses;
    //재고 총 합계
    private BigDecimal totalAmount;
    //재고 총 수량
    private int totalQuantity;
}
