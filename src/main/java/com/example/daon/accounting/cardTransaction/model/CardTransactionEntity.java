package com.example.daon.accounting.cardTransaction.model;

import com.example.daon.accounting.cardTransaction.dto.request.CardTransactionRequest;
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

@Entity(name = "card_transaction")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CardTransactionEntity {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "card_transaction_id", columnDefinition = "BINARY(16)")
    private UUID cardTransactionId;

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

    public void updateFields(CardTransactionRequest cardTransactionRequest, CustomerEntity customer) {
        this.categorySelection = cardTransactionRequest.getCategorySelection();
        this.date = cardTransactionRequest.getDate();
        this.companyName = cardTransactionRequest.getCompanyName();
        this.customerId = customer;
        this.cardCompany = cardTransactionRequest.getCardCompany();
        this.paymentDetails = cardTransactionRequest.getPaymentDetails();
        this.amount = cardTransactionRequest.getAmount();
        this.vat = cardTransactionRequest.getVat();
        this.total = cardTransactionRequest.getTotal();
        this.memo = cardTransactionRequest.getMemo();
    }
}
