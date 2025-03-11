package com.example.daon.stock.dto.response;

import lombok.Data;

import java.util.UUID;

@Data
public class StockCateResponse {
    private UUID stockCateId; // 아이디 - uuid
    private String stockCateName; // 분류 명
}
