package com.example.daon.sales.model;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class ReceiptOfficialEntity {
    //관리비 분류
    //아이디
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long receiptOfficialId;
    //관리비 명
    @Column(name = "receipt_official_name", nullable = false)
    private String receiptOfficialName;

}
