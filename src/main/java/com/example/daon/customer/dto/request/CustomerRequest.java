package com.example.daon.customer.dto.request;

import com.example.daon.admin.model.UserEntity;
import com.example.daon.customer.model.CustomerCate;
import com.example.daon.customer.model.AffiliationEntity;
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
    private String billName;
    //고객정보
    private String contactInfo;
    private String phoneNumber;
    private String fax;
    private String userId;

    //------------
    private UUID affiliationId;
    private String ceo;
    private String ceoNum;
    private String searchTarget;
    private String businessNumber;
    private String businessType;
    private String contents;
    private String customerRp;
    private String customerRpCall;
    private String bankName;
    private String bankNum;
    private String bankOwner;
    private String handlingItem;
    private String memo;
    private CustomerCate category;
    private String zipCode;
    private String address1;
    private String address2;
    private String etc;
    private UserEntity user;


    public CustomerEntity toEntity(UserEntity user, AffiliationEntity affiliation) {
        return CustomerEntity
                .builder()
                .user(user)
                .ceo(ceo)
                .ceoNum(ceoNum)
                .businessNumber(businessNumber)
                .businessType(businessType)
                .contents(contents)
                .customerRp(customerRp)
                .customerRpCall(customerRpCall)
                .bankName(bankName)
                .bankNum(bankNum)
                .bankOwner(bankOwner)
                .handlingItem(handlingItem)
                .memo(memo)
                .category(category)
                .zipCode(zipCode)
                .address1(address1)
                .address2(address2)
                .etc(etc)
                .customerName(customerName)
                .billName(billName)
                .contactInfo(contactInfo)
                .phoneNumber(phoneNumber)
                .fax(fax)
                .customerAffiliation(affiliation)
                .build();
    }
}
