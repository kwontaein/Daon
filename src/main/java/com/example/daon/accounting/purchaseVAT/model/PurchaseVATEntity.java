package com.example.daon.accounting.purchaseVAT.model;

import com.example.daon.accounting.purchaseVAT.dto.request.PurchaseVATRequest;
import com.example.daon.customer.model.CustomerEntity;
import jakarta.persistence.*;
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


    //고객
    @ManyToOne
    @JoinColumn(name = "customer")
    private CustomerEntity customerId;

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

    public void updateFromRequest(PurchaseVATRequest purchaseVATRequest, CustomerEntity customer) {
        this.categorySelection = purchaseVATRequest.getCategorySelection();
        this.date = purchaseVATRequest.getDate();
        this.businessNumber = purchaseVATRequest.getBusinessNumber();
        this.amount = purchaseVATRequest.getAmount();
        this.vat = purchaseVATRequest.getVat();
        this.total = purchaseVATRequest.getTotal();
        this.note = purchaseVATRequest.getNote();
        this.memo = purchaseVATRequest.getMemo();
        this.customerId = customer;
    }
}
