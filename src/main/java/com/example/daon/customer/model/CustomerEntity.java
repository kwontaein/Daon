package com.example.daon.customer.model;

import com.example.daon.admin.model.UserEntity;
import com.example.daon.sales.model.EstimateEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class CustomerEntity {

    //고객아이디
    @Id
    @Column(name = "customer_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customerId;

    //상호명
    @Column(name = "customer_name", nullable = false)
    private String customerName;

    //고객정보
    @Column(name = "contact_info")
    private String contactInfo;

    @Column(name = "category")
    private String category;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "fax")
    private String fax;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private UserEntity user;

    //견적서 목록
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EstimateEntity> estimates;

}
