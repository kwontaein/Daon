package com.example.daon.sales.model;

import com.example.daon.customer.model.CustomerEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

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
    @JoinColumn(name = "estimate_id", nullable = false)
    private EstimateEntity estimate; // 견적서 아이디

    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timeStamp; // 전표 등록일

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private ReceiptCategory category; // 전표 분류 (ENUM 사용)

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private CustomerEntity customer; // 고객 아이디

    @Column(name = "item_number", nullable = false)
    private Long itemNumber; // 품목 번호

    @Column(name = "quantity", nullable = false)
    private Integer quantity; // 사용 품목 수량

    @Column(name = "total_price", nullable = false)
    private int totalPrice; // 품목 총 가격

    @Column(name = "description", columnDefinition = "TEXT")
    private String description; // 전표 설명 (적요)
}
