package com.example.daon.sales.model;

import com.example.daon.admin.model.CompanyEntity;
import com.example.daon.admin.model.UserEntity;
import com.example.daon.customer.model.CustomerEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity(name = "estimate")
@Data
@Builder
@RequiredArgsConstructor
public class EstimateEntity {
    //견적서
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "estimate_id", columnDefinition = "BINARY(16)")
    private UUID estimateId;

    //고객
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private CustomerEntity customer;

    @Column(name = "estimate_date", nullable = false)
    private LocalDateTime estimateDate;

    @Column(name = "receipted", nullable = false)
    private boolean receipted;

    @Column(name = "total_amount", nullable = false)
    private BigDecimal totalAmount;

    //등록자
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    //회사
    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    private CompanyEntity company;


    @OneToMany(mappedBy = "estimate", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EstimateItem> items;
}
