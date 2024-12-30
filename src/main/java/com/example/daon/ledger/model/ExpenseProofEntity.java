package com.example.daon.ledger.model;

import com.example.daon.ledger.model.cate.ExpenseCategory;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

//지출증빙
@Entity
public class ExpenseProofEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 아이디 - auto-increment

    @Column(name = "is_deposit_converted", nullable = false)
    private Boolean isDepositConverted; // 입금전환여부

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private ExpenseCategory category; // 분류

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
    private BigDecimal total; // 합계

    @Column(name = "payment_date")
    private LocalDate paymentDate; // 지불일

    @Column(name = "deposit_converted_date")
    private LocalDate depositConvertedDate; // 입금전환일자

    @Column(name = "memo", columnDefinition = "TEXT")
    private String memo; // 메모
}
