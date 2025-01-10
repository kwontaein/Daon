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
    @Column(nullable = false, unique = true, name = "company_id", columnDefinition = "BINARY(16)")
    private UUID id; // 아이디 - uuid

    @Column(nullable = false)
    private String name; // 분류 명

    @Column(nullable = false, unique = true)
    private String key; // 분류 키

    @Column
    private int displayOrder; // 노출순서

}