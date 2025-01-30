package com.example.daon.stock.dto.request;

import com.example.daon.stock.model.StockCate;
import com.example.daon.stock.model.StockEntity;
import com.example.daon.stock.model.cate.TaxationCate;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Data
public class StockRequest {

    private UUID stockId; // 아이디 - uuid

    private String name; // 품목명

    private int quantity; // 재고 갯수

    private double inPrice; // 품목 입고 가격

    private double outPrice; // 품목 출고 가격

    private String modelName; // 품목 모델명

    private StockCate category; // 분류 코드

    private TaxationCate taxation; // 과세 기준

    private String compatibleModel; //호환기종

    private String note;  //메모

    private String stockUseEa;    //메모

    private String keyWord;  //키워드

    public StockEntity toEntity() {
        return StockEntity
                .builder()
                .stockId(stockId)
                .name(name)
                .quantity(quantity)
                .inPrice(inPrice)
                .outPrice(outPrice)
                .modelName(modelName)
                .category(category)
                .taxation(taxation)
                .compatibleModel(compatibleModel)
                .note(note)
                .stockUseEa(stockUseEa)
                .keyWord(keyWord)
                .build();
    }
}
