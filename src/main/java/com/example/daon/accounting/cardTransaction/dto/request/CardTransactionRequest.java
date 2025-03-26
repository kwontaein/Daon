package com.example.daon.accounting.cardTransaction.dto.request;

import com.example.daon.accounting.cardTransaction.model.CardTransactionEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardTransactionRequest {

    private UUID cardTransactionId;

    // 분류선택
    private String categorySelection;

    // 날짜
    private LocalDate date;

    // 업체명
    private String companyName;

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


    public CardTransactionEntity toCardTransactionEntity() {
        return CardTransactionEntity
                .builder()
                .categorySelection(categorySelection)
                .date(date)
                .companyName(companyName)
                .cardCompany(cardCompany)
                .paymentDetails(paymentDetails)
                .amount(amount)
                .vat(vat)
                .total(total)
                .memo(memo)
                .paid(false)
                .build();
    }

}
