package com.example.daon.stock.model;

import com.example.daon.stock.dto.request.StockRequest;
import com.example.daon.stock.model.cate.TaxationCate;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "stock")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StockEntity {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "stock_id", columnDefinition = "BINARY(16)")
    private UUID stockId; // 아이디 - uuid

    @Column(nullable = false, name = "stock_name")
    private String name; // 품목명

    @Column(nullable = false, name = "quantity")
    private int quantity; // 재고 갯수

    @Column(nullable = false, name = "in_price")
    private BigDecimal inPrice; // 품목 입고 가격

    @Column(nullable = false, name = "out_price")
    private BigDecimal outPrice; // 품목 출고 가격

    @Column(name = "model_name")
    private String modelName; // 품목 모델명

    @ManyToOne
    @JoinColumn(name = "stock_category_id")
    private StockCate category; // 분류 코드

    @Enumerated(EnumType.STRING)
    @Column(name = "stock_taxation")
    private TaxationCate taxation; // 과세 기준

    //메모
    @Column(name = "note")
    private String note;

    //재고계산여부
    @Column(name = "stock_use_ea")
    private boolean stockUseEa;

    //키워드
    @Column(name = "key_word")
    private String keyWord;

    public void updateFromRequest(StockRequest request, StockCate category) {

        this.name = request.getName();
        this.quantity = request.getQuantity();
        this.inPrice = request.getInPrice();
        this.outPrice = request.getOutPrice();
        this.modelName = request.getModelName();
        this.category = category;
        this.taxation = request.getTaxation();
        this.note = request.getNote();
        this.stockUseEa = request.isStockUseEa();
        this.keyWord = request.getKeyWord();
    }
}
