package com.example.daon.accounting.cardTransaction.model;

import com.example.daon.accounting.cardTransaction.dto.request.CardTransactionRequest;
import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.receipts.model.ReceiptEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.math.RoundingMode;
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

    //입금일
    @Column(name = "paid_date")
    private LocalDate paidDate;


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
        this.customerId = customer;
        this.cardCompany = cardTransactionRequest.getCardCompany();
        this.paymentDetails = cardTransactionRequest.getPaymentDetails();
        this.amount = cardTransactionRequest.getAmount();
        this.vat = cardTransactionRequest.getVat();
        this.total = cardTransactionRequest.getTotal();
        this.memo = cardTransactionRequest.getMemo();
    }

    public void updateFromReceipt(ReceiptEntity receipt) {
        BigDecimal totalPrice = receipt.getTotalPrice();

        // 소수점 연산은 항상 MathContext 또는 RoundingMode를 설정하는 것이 중요
        BigDecimal amount = totalPrice.multiply(new BigDecimal("0.9")).setScale(2, RoundingMode.HALF_UP);
        BigDecimal vat = totalPrice.multiply(new BigDecimal("0.1")).setScale(2, RoundingMode.HALF_UP);
        BigDecimal total = amount.add(vat); // 혹은 그냥 totalPrice 써도 되지만 안전하게 다시 계산

        this.amount = amount;
        this.vat = vat;
        this.total = total;
        this.customerId = receipt.getCustomer();
    }
}
