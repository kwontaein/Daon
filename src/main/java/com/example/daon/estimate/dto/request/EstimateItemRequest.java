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

    private Integer quantity;

    private BigDecimal unitPrice;

    private UUID stockId;

    public EstimateItem toEntity(EstimateEntity entity, StockEntity stock) {
        return EstimateItem
                .builder()
                .itemId(itemId)
                .estimate(entity)
                .productName(productName)
                .quantity(quantity)
                .unitPrice(unitPrice)
                .stock(stock)
                .build();
    }
}
