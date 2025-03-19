package com.example.daon.stock.dto.response;

import com.example.daon.stock.model.StockCate;
import com.example.daon.stock.model.cate.TaxationCate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StockResponse {

    private UUID stockId; // 아이디 - uuid

    private String productName; // 품목명

    private int quantity; // 재고 갯수

    private BigDecimal inPrice; // 품목 입고 가격

    private BigDecimal outPrice; // 품목 출고 가격

    private String modelName; // 품목 모델명 - 규격

    private StockCate category; // 분류 코드

    private TaxationCate taxation; // 과세 기준

    private String note;  //메모

    private boolean stockUseEa;  //재고관리여부

    private String keyWord;  //키워드

    private StockCateResponse stockCate;
}
