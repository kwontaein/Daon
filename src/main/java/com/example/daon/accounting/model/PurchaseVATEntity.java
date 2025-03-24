package com.example.daon.accounting.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Entity(name = "purchase_vat")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseVATEntity {
    @Id
    private UUID purchaseVATId;

    // 분류선택
    private String categorySelection;

    // 날짜
    private LocalDate date;

    // 업체명
    private String companyName;

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
