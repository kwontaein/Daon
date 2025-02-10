package com.example.daon.customer.dto.request;

import com.example.daon.customer.model.CustomerCateEntity;
import jakarta.persistence.Column;
import lombok.Data;

import java.util.UUID;

@Data
public class CustomerCateRequest {
    private UUID customerCateId;
    private String customerCateName;

    public CustomerCateEntity toEntity() {
        return CustomerCateEntity.builder()
                .customerCateName(customerCateName)
                .build();
    }
}
