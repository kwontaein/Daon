package com.example.daon.customer.model;

import com.example.daon.customer.dto.request.AffiliationRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "customer_affiliation")
public class AffiliationEntity {
    //고객분류

    //아이디
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "customer_affiliation_id", columnDefinition = "BINARY(16)")
    private UUID customerAffiliationId;

    //이름
    @Column(name = "customer_affiliation_name")
    private String customerAffiliationName;

    public void updateFromRequest(AffiliationRequest request) {
        this.customerAffiliationName = request.getAffiliationName();
        // 필요한 필드 추가 업데이트
    }
}
