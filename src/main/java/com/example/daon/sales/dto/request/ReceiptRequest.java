package com.example.daon.sales.dto.request;

import com.example.daon.sales.model.EstimateEntity;
import com.example.daon.sales.model.ReceiptCategory;
import com.example.daon.sales.model.ReceiptEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReceiptRequest {

    private UUID receiptId; // 전표 아이디

    private UUID estimateId; // 견적서 아이디

    private LocalDateTime timeStamp; // 전표 등록일

    private ReceiptCategory category; // 전표 분류 (ENUM 사용)

    private Long customerId; // 고객 아이디

    private Long itemNumber; // 품목 번호

    private Integer quantity; // 사용 품목 수량

    private BigDecimal totalPrice; // 품목 총 가격

    private String description; // 전표 설명 (적요)

    //추가-------------------------

    private LocalDate searchSDate;  //검색 날짜 시작일
    private LocalDate searchEDate;  //검색 날짜 종료일
    private List<UUID> ids;
    private String customerName;
    private String itemName;

    public ReceiptEntity toEntity(EstimateEntity entity) {
        return ReceiptEntity
                .builder()
                .receiptId(receiptId)
                .estimateId(entity)
                .timeStamp(timeStamp)
                .category(category)
                .itemNumber(itemNumber)
                .quantity(quantity)
                .totalPrice(totalPrice)
                .description(description)
                .build();
    }
}
