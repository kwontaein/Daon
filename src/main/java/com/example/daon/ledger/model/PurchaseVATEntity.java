package com.example.daon.ledger.model;

import com.example.daon.ledger.model.cate.PurchaseVATCategory;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "PurchaseVAT")
public class PurchaseVATEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 아이디

    @Column(name = "category", nullable = false)
    private String category; // 구분

    @Column(name = "customer", nullable = false)
    private PurchaseVATCategory customer; // 고객

    @Column(name = "registration_date", nullable = false)
    private LocalDate registrationDate; // 등록일

    @Column(name = "amount", nullable = false)
    private BigDecimal amount; // 금액

    @Column(name = "tax", nullable = false)
    private BigDecimal tax; // 세금

    @Column(name = "total_price", nullable = false)
    private BigDecimal totalPrice; // 합계

    @Column(name = "remarks", columnDefinition = "TEXT")
    private String remarks; // 비고

    @Column(name = "memo", columnDefinition = "TEXT")
    private String memo; // 메모

    // Getters and Setters (생략 가능)
}