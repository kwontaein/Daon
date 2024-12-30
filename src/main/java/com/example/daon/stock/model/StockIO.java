package com.example.daon.stock.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity
@Table(name = "stock_io")
@Data
public class StockIO {
    //재고 추가 및 감소
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "company_id", columnDefinition = "BINARY(16)")
    private UUID id; // uuid

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id", nullable = false)
    private StockEntity stock; // 재고 아이디

    @Column(nullable = false)
    private int quantityChanged; // 증감한 갯수

    @Column(nullable = false)
    private double price; // 가격

    @Column(nullable = false)
    private String type; // in / out
}
