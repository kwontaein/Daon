package com.example.daon.sales.model;

import com.example.daon.customer.model.CustomerEntity;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity(name = "estimate")
@Data
public class EstimateEntity {
    //견적서
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "estimate_id", columnDefinition = "BINARY(16)")
    private UUID estimateId;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private CustomerEntity customer;

    @Column(name = "estimate_date", nullable = false)
    private LocalDateTime estimateDate;

    @Column(name = "total_amount", nullable = false)
    private BigDecimal totalAmount;

    //담당자 - 유저

    @OneToMany(mappedBy = "estimate", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EstimateItem> items;
}
