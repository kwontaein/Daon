package com.example.daon.ledger.dto.response;

import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.receipts.model.ReceiptCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LedgerResponse {
    //날짜 / 계정 / 품목 / 수량 / 단가 / 토탈 / enum
    private UUID receiptId; // 전표 아이디

    private LocalDateTime timeStamp; // 날짜

    private ReceiptCategory category; // 전표 분류 (ENUM 사용) (계정)

    private CustomerEntity customer; // 고객 아이디

    private String customerName; // 고객 아이디

    private String productName; // 품목 명

    private String modelName; // 모델 명

    private BigDecimal outPrice; // 품목 가격

    private Integer quantity; // 사용 품목 수량

    private BigDecimal totalPrice; // 품목 총 가격

    private String memo; //메모

    private String description; //적요
}
