package com.example.daon.stock.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity
@Table(name = "stock")
@Data
public class StockEntity {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "company_id", columnDefinition = "BINARY(16)")
    private UUID id; // 아이디 - uuid

    @Column(nullable = false)
    private String name; // 품목명

    @Column
    private String searchKeyword; // 검색 키워드

    @Column(nullable = false)
    private int quantity; // 재고 갯수

    @Column(nullable = false)
    private double price; // 품목 가격

    @Column
    private String modelName; // 품목 모델명

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private StockCate category; // 분류 코드

}
