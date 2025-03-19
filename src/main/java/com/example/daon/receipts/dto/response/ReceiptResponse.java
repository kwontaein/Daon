package com.example.daon.receipts.dto.response;

import com.example.daon.customer.dto.response.CustomerResponse;
import com.example.daon.estimate.dto.response.EstimateResponse;
import com.example.daon.receipts.model.ReceiptCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ReceiptResponse {

    private UUID receiptId; // 전표 아이디

    private UUID estimateId; // 견적서 아이디

    private LocalDateTime timeStamp; // 전표 등록일

    private ReceiptCategory category; // 전표 분류 (ENUM 사용)

    private UUID customerId; // 고객 아이디

    private UUID stockId; // 품목 번호

    private Integer quantity; // 사용 품목 수량

    private int totalPrice; // 품목 총 가격

    private String description; // 전표 설명 (적요)

    private EstimateResponse estimate;

    private CustomerResponse customer;

    private String customerName;

    private String productName;

    private BigDecimal unitPrice;
}
