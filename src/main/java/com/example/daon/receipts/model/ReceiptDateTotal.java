package com.example.daon.receipts.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "receipt_date_total")
public class ReceiptDateTotal {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "total_id", columnDefinition = "BINARY(16)")
    private UUID totalId; // 전표 아이디

    @Column(name = "reg_date")
    private LocalDate regDate;

    @Column(name = "purchase")
    private BigDecimal purchase;

    @Column(name = "sales")
    private BigDecimal sales;

    @Column(name = "deposit")
    private BigDecimal deposit;

    @Column(name = "WITHDRAWAL")
    private BigDecimal WITHDRAWAL;

    @Column(name = "fee")
    private BigDecimal fee;

    @Column(name = "totalAmount")
    private BigDecimal totalAmount;

}
