package com.example.daon.accounting.procurement.model;

import com.example.daon.accounting.procurement.dto.request.ProcurementRequest;
import com.example.daon.customer.model.CustomerEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDate;
import java.util.UUID;

@Entity(name = "procurement_settlement")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProcurementEntity {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "procurement_settlement_id", columnDefinition = "BINARY(16)")
    private UUID procurementSettlementId;

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

    // 모델명
    @Column(name = "model_name")
    private String modelName;

    // 매입처
    @Column(name = "vendor")
    private String vendor;

    // 수량
    @Column(name = "quantity")
    private int quantity;

    // 인수
    @Column(name = "acceptance")
    private int acceptance;

    // 설치
    @Column(name = "installation")
    private String installation;

    // 결재
    @Column(name = "payment")
    private String payment;

    // 메모
    @Column(name = "memo")
    private String memo;

    public void updateFromRequest(ProcurementRequest procurementRequest, CustomerEntity customer) {
        this.categorySelection = procurementRequest.getCategorySelection();
        this.date = procurementRequest.getDate();
        this.companyName = procurementRequest.getCompanyName();
        this.modelName = procurementRequest.getModelName();
        this.vendor = procurementRequest.getVendor();
        this.quantity = procurementRequest.getQuantity();
        this.acceptance = procurementRequest.getAcceptance();
        this.installation = procurementRequest.getInstallation();
        this.payment = procurementRequest.getPayment();
        this.memo = procurementRequest.getMemo();
    }
}
