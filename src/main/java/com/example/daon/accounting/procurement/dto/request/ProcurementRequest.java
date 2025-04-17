package com.example.daon.accounting.procurement.dto.request;

import com.example.daon.accounting.procurement.model.ProcurementEntity;
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
public class ProcurementRequest {

    private UUID procurementSettlementId;

    // 분류선택
    private String categorySelection;

    // 날짜
    private LocalDate date;

    // 고객아이디
    private UUID customerId;

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


    public ProcurementEntity toProcurementEntity(CustomerEntity customer) {
        return ProcurementEntity
                .builder()
                .categorySelection(categorySelection)
                .date(date)

                .customerId(customer)
                .modelName(modelName)
                .vendor(vendor)
                .quantity(quantity)
                .acceptance(acceptance)
                .installation(installation)
                .payment(payment)
                .memo(memo)
                .build();
    }
}
