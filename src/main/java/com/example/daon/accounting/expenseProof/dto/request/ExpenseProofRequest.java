package com.example.daon.accounting.expenseProof.dto.request;

import com.example.daon.accounting.expenseProof.model.ExpenseProofEntity;
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
public class ExpenseProofRequest {

    private UUID expenseProofId;

    // 분류선택
    private String categorySelection;

    // 날짜
    private LocalDate date;
    //입금일
    private LocalDate paidDate;
    // 업체명
    private String companyName;
    // 고객아이디
    private UUID customerId;
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

    // 메모
    private String memo;

    // 카드사
    private String cardCompany;


    public ExpenseProofEntity toExpenseProofEntity(CustomerEntity customer) {
        return ExpenseProofEntity
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
