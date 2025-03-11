package com.example.daon.receipts.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerBillResponse {
    private LocalDate sDate;
    private LocalDate eDate;
    private String customerName;
    private String sort;
    private String includeCondition;
    private boolean currentMonthSales;
    private boolean currentMonthPurchases;
    private boolean currentMonthDeposits;
    private boolean currentMonthWithdrawals;
    private boolean currentMonthTransactions;
    private boolean previousMonthCarryOver;
}
