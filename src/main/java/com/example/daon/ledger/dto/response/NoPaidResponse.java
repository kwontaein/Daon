package com.example.daon.ledger.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoPaidResponse {
    //상호명
    private String customerName;
    //전기이월
    private BigDecimal previousBalance;
    //매출액
    private BigDecimal salesAmount;
    //수금액
    private BigDecimal collectionAmount;
    //매입액
    private BigDecimal purchaseAmount;
    //지급액
    private BigDecimal paymentAmount;
    //매출할인액
    private BigDecimal salesDiscount;
    //매입할인액
    private BigDecimal purchaseDiscount;
    //잔액
    private BigDecimal currentBalance;
}
