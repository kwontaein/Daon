package com.example.daon.accounting.salesVAT.dto.response;

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
public class SalesVATResponse {
    private UUID salesVATId;

    // 분류선택
    private String categorySelection;

    // 날짜
    private LocalDate date;

    //입금전환일
    private LocalDate paidDate;

    // 업체명
    private String customerName;

    //고객
    private UUID customerId;

    // 사업자번호
    private String businessNumber;

    //결제내역
    private String paymentDetails;

    // 금액
    private BigDecimal amount;

    // 부가세
    private BigDecimal vat;

    // 합계
    private BigDecimal total;

    // 메모
    private String memo;


}
