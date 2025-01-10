package com.example.daon.ledger.model;

import com.example.daon.ledger.model.cate.TransactionCategory;
import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "CardTransaction")
public class CardTransactionEntity {

    @Id
    @GeneratedValue(generator = "uuid2")
    @Column(nullable = false, unique = true, name = "ct_id", columnDefinition = "BINARY(16)")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private UUID id; // 아이디

    @Column(name = "is_deposit_converted", nullable = false)
    private Boolean isDepositConverted; // 입금전환 여부

    @Column(name = "voucher_number", nullable = false)
    private String voucherNumber; // 전표 번호

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private TransactionCategory category; // 분류

    @Column(name = "customer", nullable = false)
    private String customer; // 고객

    @Column(name = "card_company", nullable = false)
    private String cardCompany; // 카드사

    @Column(name = "registration_date", nullable = false)
    private LocalDate registrationDate; // 등록일

    @Column(name = "description", columnDefinition = "TEXT")
    private String description; // 내용

    @Column(name = "charge", nullable = false)
    private BigDecimal charge; // 요금

    @Column(name = "tax", nullable = false)
    private BigDecimal tax; // 세금

    @Column(name = "total", nullable = false)
    private BigDecimal total; // 총액

    @Column(name = "payment_date")
    private LocalDate paymentDate; // 지불일

    @Column(name = "converted_date")
    private LocalDate convertedDate; // 전환일자
}
