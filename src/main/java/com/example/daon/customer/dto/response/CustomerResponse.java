package com.example.daon.customer.dto.response;

import com.example.daon.customer.model.CustomerCate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CustomerResponse {
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
    private UUID cateId;
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
    private UserResponse user;
    private AffiliationResponse affiliation;

}
