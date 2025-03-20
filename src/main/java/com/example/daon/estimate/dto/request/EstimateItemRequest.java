package com.example.daon.estimate.dto.request;

import com.example.daon.estimate.model.EstimateEntity;
import com.example.daon.estimate.model.EstimateItem;
import com.example.daon.stock.model.StockEntity;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
public class EstimateItemRequest {
    private UUID itemId;

    private String estimateId;

    private String productName;

    private String modelName;

    private Integer quantity;

    private BigDecimal unitPrice;

    private UUID stockId;

    private boolean hand;

    public EstimateItem toEntity(EstimateEntity entity, StockEntity stock) {
        return EstimateItem
                .builder()
                .itemId(entity.getEstimateId())
                .estimate(entity)
                .productName(productName)
                .modelName(modelName)
                .quantity(quantity)
                .unitPrice(unitPrice)
                .hand(hand)
                .stock(stock)
                .build();
    }
}
