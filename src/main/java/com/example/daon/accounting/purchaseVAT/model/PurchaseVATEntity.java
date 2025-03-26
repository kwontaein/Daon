package com.example.daon.accounting.purchaseVAT.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

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
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "purchase_vat_id", columnDefinition = "BINARY(16)")
    private UUID purchaseVATId;

    // 분류선택
    @Column(name = "category_selection")
    private String categorySelection;

    // 날짜
    @Column(name = "date")
    private LocalDate date;

    // 업체명
    @Column(name = "category_name")
    private String companyName;

    // 사업자번호
    @Column(name = "business_number")
    private String businessNumber;

    // 금액
    @Column(name = "amount")
    private BigDecimal amount;

    // 부가세
    @Column(name = "vat")
    private BigDecimal vat;

    // 합계
    @Column(name = "total")
    private BigDecimal total;

    // 비고
    @Column(name = "note")
    private String note;

    // 메모
    @Column(name = "memo")
    private String memo;

}
