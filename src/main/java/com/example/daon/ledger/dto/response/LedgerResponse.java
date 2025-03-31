package com.example.daon.ledger.dto.response;

import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.estimate.model.EstimateEntity;
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
    private UUID receiptId; // 전표 아이디

    private EstimateEntity estimate; // 견적서 아이디

    private LocalDateTime timeStamp; // 전표 등록일

    private ReceiptCategory category; // 전표 분류 (ENUM 사용)

    private CustomerEntity customer; // 고객 아이디

    private UUID itemNumber; // 품목 아이디

    private Integer quantity; // 사용 품목 수량

    private BigDecimal totalPrice; // 품목 총 가격

    private String description; // 전표 설명 (적요)
}
