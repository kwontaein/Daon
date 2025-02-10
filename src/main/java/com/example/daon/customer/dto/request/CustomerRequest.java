package com.example.daon.customer.dto.request;

import com.example.daon.admin.model.UserEntity;
import com.example.daon.customer.model.CustomerEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerRequest {
    private UUID customerId;
    //상호명
    private String customerName;
    //고객정보
    private String contactInfo;

    private String category;

    private String phoneNumber;

    private String fax;

    private String userId;

    //------------
    private UUID cateId;

    private String ceo;
    private String searchTarget;


    public CustomerEntity toEntity(UserEntity user) {
        return CustomerEntity
                .builder()
                .customerId(customerId)
                .customerName(customerName)
                .contactInfo(contactInfo)
                .phoneNumber(phoneNumber)
                .fax(fax)
                .user(user)
                .build();
    }
}
