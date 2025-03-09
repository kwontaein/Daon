package com.example.daon.customer.dto.request;

import com.example.daon.customer.model.AffiliationEntity;
import lombok.Data;

import java.util.UUID;

@Data
public class CustomerCateRequest {
    private UUID customerCateId;
    private String customerCateName;

    public AffiliationEntity toEntity() {
        return AffiliationEntity.builder()
                .customerCateName(customerCateName)
                .build();
    }
}
