package com.example.daon.receipts.dto.request;

import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.estimate.model.EstimateEntity;
import com.example.daon.official.model.OfficialEntity;
import com.example.daon.receipts.model.FromCategory;
import com.example.daon.receipts.model.ReceiptCategory;
import com.example.daon.receipts.model.ReceiptEntity;
import com.example.daon.stock.model.StockEntity;
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

    private UUID receiptId; // 전표 아이디'

    private UUID estimateId; // 견적서 아이디

    private LocalDateTime timeStamp; // 전표 등록일

    private ReceiptCategory category; // 전표 분류 (ENUM 사용)

    private UUID customerId; // 고객 아이디

    private UUID stockId; // 품목 번호

    private UUID officialId; // 관리비 번호

    private Integer quantity; // 사용 품목 수량

    private BigDecimal totalPrice; // 품목 총 가격

    private String description; // 전표 설명 (적요)

    private String memo; //  (비고)


    //추가-------------------------

    private LocalDate searchSDate;  //검색 날짜 시작일
    private LocalDate searchEDate;  //검색 날짜 종료일
    private List<UUID> receiptIds; //여러개 한번에 생성 시 보내는 아이디
    private String customerName; //고객명
    private String productName; //품명

    public ReceiptEntity toEntity(EstimateEntity entity, CustomerEntity customer, StockEntity stock, OfficialEntity official) {
        return ReceiptEntity
                .builder()
                .receiptId(receiptId)
                .estimate(entity)
                .timeStamp(timeStamp)
                .category(category)
                .stock(stock)
                .officialId(official)
                .quantity(quantity)
                .totalPrice(totalPrice)
                .description(description)
                .customer(customer)
                .memo(memo)
                .comeFrom(FromCategory.EX)
                .build();
    }
}
