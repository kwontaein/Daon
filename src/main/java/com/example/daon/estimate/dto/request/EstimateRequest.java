package com.example.daon.estimate.dto.request;

import com.example.daon.admin.model.CompanyEntity;
import com.example.daon.admin.model.UserEntity;
import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.estimate.model.EstimateEntity;
import com.example.daon.estimate.model.EstimateItem;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
public class EstimateRequest {
    private UUID estimateId;
    private UUID customerId;
    private LocalDateTime estimateDate;
    private BigDecimal totalAmount;
    private List<EstimateItemRequest> items;

    //----------------------

    private LocalDate searchSDate;  //검색 날짜 시작일
    private LocalDate searchEDate;  //검색 날짜 종료일
    private String companyName;
    private String customerName;
    private String itemName;
    private boolean receipted;

    public EstimateEntity toEntity(CustomerEntity customer, CompanyEntity company, UserEntity user, List<EstimateItem> items) {
        return EstimateEntity
                .builder()
                .estimateId(estimateId)
                .customer(customer)
                .company(company)
                .user(user)
                .receipted(receipted)
                .totalAmount(totalAmount)
                .estimateDate(estimateDate)
                .items(items)
                .build();
    }
}
