package com.example.daon.stock.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity
@Data
@Table(name = "stock_category")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StockCate {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "stock_category_id", columnDefinition = "BINARY(16)")
    private UUID stockCateId; // 아이디 - uuid

    @Column(nullable = false, name = "stock_cate_name")
    private String stockCateName; // 분류 명

    @Column(nullable = false, name = "cate_key")
    private String cateKey; // 분류 키
}