package com.example.daon.receipts.model;

import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.estimate.model.EstimateEntity;
import com.example.daon.official.model.OfficialEntity;
import com.example.daon.receipts.dto.request.ReceiptRequest;
import com.example.daon.stock.model.StockEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "receipt")
public class ReceiptEntity {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "receipt_id", columnDefinition = "BINARY(16)")
    private UUID receiptId; // 전표 아이디

    @ManyToOne
    @JoinColumn(name = "estimate_id", nullable = true)
    private EstimateEntity estimate; // 견적서 아이디

    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timeStamp; // 전표 등록일

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private ReceiptCategory category; // 전표 분류 (ENUM 사용)

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private CustomerEntity customer; // 고객 아이디

    @JoinColumn(name = "stock_id")
    @ManyToOne
    private StockEntity stock; // 품목 아이디

    @JoinColumn(name = "official_id")
    @ManyToOne
    private OfficialEntity officialId; // 관리비 아이디

    @Column(name = "quantity", nullable = false)
    private Integer quantity; // 사용 품목 수량

    @Column(name = "total_price", nullable = false)
    private BigDecimal totalPrice; // 품목 총 가격

    @Column(name = "description", columnDefinition = "TEXT")
    private String description; // 전표 설명 (적요)

    @Column(name = "memo", columnDefinition = "TEXT")
    private String memo; //  (비고)

    public void updateFromRequest(ReceiptRequest request, CustomerEntity customer, StockEntity stock) {
        this.category = request.getCategory();
        this.customer = customer;
        this.stock = stock;
        this.quantity = request.getQuantity();
        this.totalPrice = request.getTotalPrice();
        this.description = request.getDescription();
    }
}
