package com.example.daon.sales.dto.request;

import com.example.daon.customer.model.CustomerEntity;
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

    private UUID customerId; // 고객 아이디

    private UUID itemNumber; // 품목 번호

    private Integer quantity; // 사용 품목 수량

    private int totalPrice; // 품목 총 가격

    private String description; // 전표 설명 (적요)

    //추가-------------------------

    private LocalDate searchSDate;  //검색 날짜 시작일
    private LocalDate searchEDate;  //검색 날짜 종료일
    private List<UUID> ids; //여러개 한번에 생성 시 보내는 아이디
    private String customerName; //고객명
    private String itemName; //품명

    public ReceiptEntity toEntity(EstimateEntity entity, CustomerEntity customer) {
        return ReceiptEntity
                .builder()
                .receiptId(receiptId)
                .estimate(entity)
                .timeStamp(timeStamp)
                .category(category)
                .itemNumber(itemNumber)
                .quantity(quantity)
                .totalPrice(totalPrice)
                .description(description)
                .customer(customer)
                .build();
    }
}
