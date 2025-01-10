package com.example.daon.ledger.model;

import com.example.daon.ledger.model.cate.PsCategory;
import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "ProcurementSettlement")
public class ProcurementSettlementEntity {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "ps_id", columnDefinition = "BINARY(16)")
    private UUID id; // 아이디

    @Column(name = "category", nullable = false)
    private PsCategory category; // 분류

    @Column(name = "registration_date", nullable = false)
    private LocalDate registrationDate; // 등록일

    @Column(name = "customer_name", nullable = false)
    private String customerName; // 고객명

    @Column(name = "model_name", nullable = false)
    private String modelName; // 모델명

    @Column(name = "supplier", nullable = false)
    private String supplier; // 매입처

    @Column(name = "quantity", nullable = false)
    private Integer quantity; // 수량

    @Column(name = "acceptance")
    private Boolean acceptance; // 인수 여부

    @Column(name = "installation")
    private Boolean installation; // 설치 여부

    @Column(name = "payment", nullable = false)
    private BigDecimal payment; // 결제

    @Column(name = "memo", columnDefinition = "TEXT")
    private String memo; // 메모

}