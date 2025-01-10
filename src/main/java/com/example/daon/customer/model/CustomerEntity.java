package com.example.daon.customer.model;

import com.example.daon.admin.model.UserEntity;
import com.example.daon.sales.model.EstimateEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;
import java.util.UUID;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CustomerEntity {

    //고객아이디
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "customer_id", columnDefinition = "BINARY(16)")
    private UUID customerId;

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
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "customer_cate_id")
    private UserEntity customerCateId;

    //견적서 목록
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EstimateEntity> estimates;

}
