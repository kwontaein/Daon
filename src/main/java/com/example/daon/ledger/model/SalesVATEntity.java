package com.example.daon.ledger.model;

//매출부가세

import com.example.daon.ledger.model.cate.SalesCategory;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "SalesVAT")
public class SalesVATEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 아이디

    @Column(name = "is_deposit_converted", nullable = false)
    private Boolean isDepositConverted; // 입금전환 여부

    @Column(name = "voucher_number", nullable = false)
    private String voucherNumber; // 전표 번호

    @Column(name = "category", nullable = false)
    private SalesCategory category; // 회사 분류

    @Column(name = "customer", nullable = false)
    private String customer; // 고객

    @Column(name = "payment_details", columnDefinition = "TEXT")
    private String paymentDetails; // 지불 내용

    @Column(name = "amount", nullable = false)
    private BigDecimal amount; // 요금

    @Column(name = "tax", nullable = false)
    private BigDecimal tax; // 세금

    @Column(name = "total_price", nullable = false)
    private BigDecimal totalPrice; // 총 가격

    @Column(name = "payment_date")
    private LocalDate paymentDate; // 지불 일자

    @Column(name = "deposit_converted_date")
    private LocalDate depositConvertedDate; // 입금전환 일자

    @Column(name = "registration_date", nullable = false)
    private LocalDate registrationDate; // 등록일
}