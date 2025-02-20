package com.example.daon.stock.dto.request;

import com.example.daon.stock.model.StockCate;
import lombok.Data;

import java.util.UUID;

@Data
public class StockCateRequest {
    private UUID stockCateId; // 아이디 - uuid
    private String stockCateName; // 분류 명
    private String cateKey; // 분류 키

    public StockCate toEntity() {
        return StockCate
                .builder()
                .cateKey(cateKey)
                .stockCateName(stockCateName)
                .build();
    }
}
