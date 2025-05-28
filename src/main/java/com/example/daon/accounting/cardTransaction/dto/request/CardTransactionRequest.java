package com.example.daon.accounting.cardTransaction.dto.request;

import com.example.daon.accounting.cardTransaction.model.CardTransactionEntity;
import com.example.daon.customer.model.CustomerEntity;
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

    //입금일
    private LocalDate paidDate;

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


    //검색용
    private LocalDate searchSDate;
    private LocalDate searchEDate;
    private String customerName;

    private UUID receiptId;

    public CardTransactionEntity toCardTransactionEntity(CustomerEntity customer) {
        return CardTransactionEntity
                .builder()
                .categorySelection(categorySelection)
                .date(date)
                .customerId(customer)
                .cardCompany(cardCompany)
                .paymentDetails(paymentDetails)
                .amount(amount)
                .vat(vat)
                .total(total)
                .memo(memo)
                .paid(false)
                .paidDate(null)
                .build();
    }

}
