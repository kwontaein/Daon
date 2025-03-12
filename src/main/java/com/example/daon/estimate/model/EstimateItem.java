package com.example.daon.estimate.model;

import com.example.daon.stock.model.StockEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "Estimate_Item")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EstimateItem {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "item_id", columnDefinition = "BINARY(16)")
    private UUID itemId;

    @ManyToOne
    @JoinColumn(name = "estimate_id", nullable = false)
    private EstimateEntity estimate;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "unit_price", nullable = false)
    private BigDecimal unitPrice;
    // 필드 업데이트 메서드

    @ManyToOne
    @JoinColumn(name = "stock_id")
    private StockEntity stock;

    public void updateFields(EstimateItem newItem) {
        this.productName = newItem.getProductName();
        this.quantity = newItem.getQuantity();
        this.unitPrice = newItem.getUnitPrice();
    }
}