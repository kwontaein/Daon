package com.example.daon.stock.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity
@Data
@Table(name = "stock_category")
public class StockCate {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "stock_category_id", columnDefinition = "BINARY(16)")
    private UUID stockCateId; // 아이디 - uuid

    @Column(nullable = false, name = "name")
    private String name; // 분류 명

    @Column(nullable = false, unique = true, name = "cate_key")
    private String cateKey; // 분류 키

    @Column(name = "display_order")
    private int displayOrder; // 노출순서

}