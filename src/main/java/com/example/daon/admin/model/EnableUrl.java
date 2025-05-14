package com.example.daon.admin.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity(name = "enable_url")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnableUrl {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "url_id", columnDefinition = "BINARY(16)")
    private UUID urlId;

    @OneToOne
    @JoinColumn(name = "user")
    private UserEntity user;
    @Builder.Default
    private boolean receipt = false;
    @Builder.Default
    private boolean task = false;
    @Builder.Default
    private boolean admin = false;
    @Builder.Default
    private boolean estimate = false;
    @Builder.Default
    @Column(name = "task_estimate")
    private boolean taskEstimate = false;
    @Builder.Default
    private boolean remain = false;
    @Builder.Default
    private boolean official = false;
    @Builder.Default
    private boolean customer = false;
    @Builder.Default
    private boolean affiliation = false;
    @Builder.Default
    private boolean stock = false;
    @Builder.Default
    @Column(name = "stock_cate")
    private boolean stockCate = false;
    @Builder.Default
    private boolean point = false;
    @Builder.Default
    @Column(name = "ledger_customer")
    private boolean ledgerCustomer = false;
    @Builder.Default
    @Column(name = "ledger_customers")
    private boolean ledgerCustomers = false;
    @Builder.Default
    @Column(name = "ledger_stock")
    private boolean ledgerStock = false;
    @Builder.Default
    @Column(name = "ledger_sales")
    private boolean ledgerSales = false;
    @Builder.Default
    @Column(name = "ledger_purchase")
    private boolean ledgerPurchase = false;
    @Builder.Default
    @Column(name = "ledger_official")
    private boolean ledgerOfficial = false;
    @Builder.Default
    @Column(name = "ledger_stock_count")
    private boolean ledgerStockCount = false;
    @Builder.Default
    @Column(name = "ledger_etc")
    private boolean ledgerEtc = false;
    @Builder.Default
    private boolean company = false;
    @Builder.Default
    private boolean employee = false;
    @Builder.Default
    private boolean dept = false;
    @Builder.Default
    private boolean pvat = false;
    @Builder.Default
    private boolean svat = false;
    @Builder.Default
    private boolean pset = false;
    @Builder.Default
    private boolean card = false;
    @Builder.Default
    private boolean proof = false;
    @Builder.Default
    private boolean board = false;
    @Builder.Default
    private boolean schedule = false;
}

