package com.example.daon.stock.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PersonalStockResponse {
    //유저아이디
    private UUID userId;
    //재고명
    private String productName;
    //소유갯수
    private int cnt;
}
