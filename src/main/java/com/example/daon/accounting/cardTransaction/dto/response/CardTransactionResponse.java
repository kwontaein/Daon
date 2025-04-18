package com.example.daon.accounting.cardTransaction.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CardTransactionResponse {

    private UUID cardTransactionId;

    // 분류선택
    private String categorySelection;

    // 날짜
    private LocalDate date;

    //입금일
    private LocalDate paidDate;

    // 업체명
    private String customerName;

    // 고객아이디
    private UUID customerId;

    // 결제내역
    private String paymentDetails;

    // 금액
    private BigDecimal amount;

    // 부가세
    private BigDecimal vat;

    // 합계
    private BigDecimal total;

    // 메모
    private String memo;

    // 카드사
    private String cardCompany;


}
