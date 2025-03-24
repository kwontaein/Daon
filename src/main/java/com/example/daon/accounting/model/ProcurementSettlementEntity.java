package com.example.daon.accounting.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Entity(name = "procurement_settlement")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProcurementSettlementEntity {
    @Id
    private UUID procurementSettlementId;

    // 분류선택
    private String categorySelection;

    // 날짜
    private LocalDate date;

    // 업체명
    private String companyName;

    // 모델명
    private String modelName;

    // 매입처
    private String vendor;

    // 수량
    private int quantity;

    // 인수
    private int acceptance;

    // 설치
    private String installation;

    // 결재
    private String payment;

    // 메모
    private String memo;

}
