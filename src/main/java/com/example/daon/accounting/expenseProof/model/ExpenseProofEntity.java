package com.example.daon.accounting.expenseProof.model;

import com.example.daon.accounting.expenseProof.dto.request.ExpenseProofRequest;
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

@Entity(name = "expense_proof")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseProofEntity {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "expense_proof_id", columnDefinition = "BINARY(16)")
    private UUID expenseProofId;

    // 분류선택
    @Column(name = "category_selection")
    private String categorySelection;

    // 날짜
    @Column(name = "date")
    private LocalDate date;

    //입금일
    @Column(name = "paid_date")
    private LocalDate paidDate;

    // 업체명
    @Column(name = "category_name")
    private String companyName;

    //고객 -업체명
    @ManyToOne
    @JoinColumn(name = "customer")
    private CustomerEntity customerId;

    // 카드사
    @Column(name = "card_company")
    private String cardCompany;

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

    //전표아이디
    @Column(name = "receipt_id")
    private UUID receiptId;

    public void updateFromRequest(ExpenseProofRequest expenseProofRequest, CustomerEntity customer) {
        this.categorySelection = expenseProofRequest.getCategorySelection();
        this.date = expenseProofRequest.getDate();
        this.companyName = expenseProofRequest.getCompanyName();
        this.customerId = customer;
        this.cardCompany = expenseProofRequest.getCardCompany();
        this.paymentDetails = expenseProofRequest.getPaymentDetails();
        this.amount = expenseProofRequest.getAmount();
        this.vat = expenseProofRequest.getVat();
        this.total = expenseProofRequest.getTotal();
        this.memo = expenseProofRequest.getMemo();
    }
}
