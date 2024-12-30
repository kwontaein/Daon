package com.example.daon.sales.model;

import com.example.daon.customer.model.CustomerEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity(name = "estimate")
@Data
public class EstimateEntity {
    //견적서
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long estimateId;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private CustomerEntity customer;

    @Column(name = "estimate_date", nullable = false)
    private LocalDateTime estimateDate;

    @Column(name = "total_amount", nullable = false)
    private BigDecimal totalAmount;

    //담당자 - 유저

    //

    @OneToMany(mappedBy = "estimate", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EstimateItem> items;
}
