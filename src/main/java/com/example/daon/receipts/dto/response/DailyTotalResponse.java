package com.example.daon.receipts.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public class DailyTotalResponse {
    private UUID dateTotalId;

    //전일잔고
    private BigDecimal beforeTotal;

    //날짜
    private LocalDate date;

    //매입
    private BigDecimal purchase;

    //매출
    private BigDecimal sales;

    //입금
    private BigDecimal withdrawal;

    //출금
    private BigDecimal deposit;

    //경비
    private BigDecimal official;

    //현잔고
    private BigDecimal remainTotal;
}
