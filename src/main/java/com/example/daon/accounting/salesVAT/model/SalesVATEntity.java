package com.example.daon.accounting.salesVAT.model;

import com.example.daon.accounting.salesVAT.dto.request.SalesVATRequest;
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

@Entity(name = "sales_vat")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SalesVATEntity {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "sales_vat_id", columnDefinition = "BINARY(16)")
    private UUID salesVATId;

    // 분류선택
    @Column(name = "category_selection")
    private String categorySelection;

    // 날짜
    @Column(name = "date")
    private LocalDate date;

    // 업체명
    @Column(name = "category_name")
    private String companyName;

    //고객 -업체명
    @ManyToOne
    @JoinColumn(name = "customer")
    private CustomerEntity customerId;

    // 사업자번호
    @Column(name = "business_number")
    private String businessNumber;

    // 결제내역
    @Column(name = "payment_details")
    private String paymentDetails;

    // 금액
    @Column(name = "amount")
    private BigDecimal amount;

    // 부가세
    @Column(name = "vat")
    private BigDecimal vat;

    // 합계
    @Column(name = "total")
    private BigDecimal total;

    // 메모
    @Column(name = "memo")
    private String memo;

    //입금전환여부
    @Column(name = "paid")
    private boolean paid;


    public void updateFromRequest(SalesVATRequest salesVATRequest) {
        this.categorySelection = salesVATRequest.getCategorySelection();
        this.date = salesVATRequest.getDate();
        this.companyName = salesVATRequest.getCompanyName();
        this.businessNumber = salesVATRequest.getBusinessNumber();
        this.paymentDetails = salesVATRequest.getPaymentDetails();
        this.amount = salesVATRequest.getAmount();
        this.vat = salesVATRequest.getVat();
        this.total = salesVATRequest.getTotal();
        this.memo = salesVATRequest.getMemo();
    }
}
