package com.example.daon.sales.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "Receipt")
public class ReceiptEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 전표 아이디

    @Column(name = "estimate_id", nullable = false)
    private Long estimateId; // 견적서 아이디

    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timeStamp; // 전표 등록일

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private ReceiptCategory category; // 전표 분류 (ENUM 사용)

    @Column(name = "customer_id", nullable = false)
    private Long customerId; // 고객 아이디

    @Column(name = "item_number", nullable = false)
    private Long itemNumber; // 품목 번호

    @Column(name = "quantity", nullable = false)
    private Integer quantity; // 사용 품목 수량

    @Column(name = "total_price", nullable = false)
    private BigDecimal totalPrice; // 품목 총 가격

    @Column(name = "description", columnDefinition = "TEXT")
    private String description; // 전표 설명 (적요)
}
