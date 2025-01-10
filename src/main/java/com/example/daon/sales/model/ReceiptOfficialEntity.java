package com.example.daon.sales.model;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

public class ReceiptOfficialEntity {
    //관리비 분류
    //아이디
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "receipt_official_id", columnDefinition = "BINARY(16)")
    private UUID receiptOfficialId;
    //관리비 명
    @Column(name = "receipt_official_name", nullable = false)
    private String receiptOfficialName;

}
