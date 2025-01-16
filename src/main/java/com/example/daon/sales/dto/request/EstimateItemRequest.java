package com.example.daon.sales.dto.request;

import com.example.daon.sales.model.EstimateEntity;
import com.example.daon.sales.model.EstimateItem;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
public class EstimateItemRequest {
    private UUID itemId;

    private String estimateId;

    private String productName;

    private Integer quantity;

    private BigDecimal unitPrice;

    public EstimateItem toEntity(EstimateEntity entity) {
        return EstimateItem
                .builder()
                .itemId(itemId)
                .estimate(entity)
                .productName(productName)
                .quantity(quantity)
                .unitPrice(unitPrice)
                .build();
    }
}
