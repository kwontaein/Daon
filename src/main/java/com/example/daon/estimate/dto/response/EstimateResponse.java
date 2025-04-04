package com.example.daon.estimate.dto.response;

import com.example.daon.company.dto.response.CompanyResponse;
import com.example.daon.customer.dto.response.CustomerResponse;
import com.example.daon.task.dto.response.TaskResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EstimateResponse {
    private UUID estimateId;
    private UUID customerId;
    private UUID companyId;
    private UUID taskId;
    private boolean receipted;
    private LocalDateTime receiptDate;
    private LocalDateTime estimateDate;
    private BigDecimal totalAmount;
    private List<EstimateItemResponse> items;
    private CustomerResponse customer;
    private CompanyResponse company;
    private String userId;
    private String userName;
    private String customerName;
    private String assignedUser;
    private TaskResponse taskResponse;
}
