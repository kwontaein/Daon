package com.example.daon.customer.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity
public class CustomerCateEntity {
    //고객분류

    //아이디 -> 번호
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "customer_cate_id", columnDefinition = "BINARY(16)")
    private UUID customerCateId;

    //이름
    @Column(name = "customer_cate_name")
    private UUID customerCateName;
}
