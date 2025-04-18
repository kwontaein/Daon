package com.example.daon.accounting.purchaseVAT.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PurchaseVATResponse {

    private UUID purchaseVATId;

    // 분류선택
    private String categorySelection;

    // 날짜
    private LocalDate date;

    // 업체명
    private String customerName;

    private UUID customerId;

    // 사업자번호
    private String businessNumber;

    // 금액
    private BigDecimal amount;

    // 부가세
    private BigDecimal vat;

    // 합계
    private BigDecimal total;

    // 비고
    private String note;

    // 메모
    private String memo;

}
