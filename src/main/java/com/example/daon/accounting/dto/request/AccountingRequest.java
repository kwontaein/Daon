package com.example.daon.accounting.dto.request;

import com.example.daon.accounting.model.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountingRequest {

    // 분류선택
    private String categorySelection;

    // 날짜
    private LocalDate date;

    // 업체명
    private String companyName;

    // 사업자번호
    private String businessNumber;

    // 결제내역
    private String paymentDetails;

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

    // 모델명
    private String modelName;

    // 매입처
    private String vendor;

    // 수량
    private int quantity;

    // 인수
    private int acceptance;

    // 설치
    private String installation;

    // 결재
    private String payment;

    // 카드사
    private String cardCompany;


    private CardTransactionEntity toCardTransactionEntity() {
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

    private ExpenseProofEntity toExpenseProofEntity() {
        return ExpenseProofEntity
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

    private PurchaseVATEntity toPurchaseVATEntity() {
        return PurchaseVATEntity
                .builder()
                .categorySelection(categorySelection)
                .date(date)
                .companyName(companyName)
                .businessNumber(businessNumber)
                .amount(amount)
                .vat(vat)
                .total(total)
                .note(note)
                .memo(memo)
                .build();
    }

    private SalesVATEntity toSalesVATEntity() {
        return SalesVATEntity
                .builder()
                .categorySelection(categorySelection)
                .date(date)
                .companyName(companyName)
                .businessNumber(businessNumber)
                .amount(amount)
                .vat(vat)
                .total(total)
                .memo(memo)
                .paid(false)
                .build();
    }

    private ProcurementSettlementEntity toProcurementSettlementEntity() {
        return ProcurementSettlementEntity
                .builder()
                .build();
    }
}
