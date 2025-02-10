package com.example.daon.receipts.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "maintenance_cost")
public class MaintenanceCostEntity {
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
