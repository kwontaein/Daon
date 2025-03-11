package com.example.daon.customer.dto.request;

import com.example.daon.customer.model.AffiliationEntity;
import lombok.Data;

import java.util.UUID;

@Data
public class AffiliationRequest {
    private UUID affiliationId;
    private String affiliationName;

    public AffiliationEntity toEntity() {
        return AffiliationEntity.builder()
                .customerAffiliationName(affiliationName)
                .build();
    }
}
