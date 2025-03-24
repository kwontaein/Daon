package com.example.daon.estimate.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EstimateItemResponse {
    private UUID itemId;
    private String estimateId;
    private String productName;
    private Integer quantity;
    private BigDecimal unitPrice;
    private String modelName;
    private EstimateResponse estimate;
    private UUID stockId;
    private boolean hand;
}
