package com.example.daon.receipts.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "date_total")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DailyTotalEntity {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "date_total_id", columnDefinition = "BINARY(16)")
    private UUID dateTotalId;

    //전일잔고
    @Column(name = "before_total")
    private BigDecimal beforeTotal;

    //날짜
    @Column(name = "date")
    private LocalDate date;

    //매입
    @Column(name = "purchase")
    private BigDecimal purchase;

    //매출
    @Column(name = "sales")
    private BigDecimal sales;

    //입금
    @Column(name = "withdrawal")
    private BigDecimal withdrawal;

    //출금
    @Column(name = "deposit")
    private BigDecimal deposit;

    //경비
    @Column(name = "official")
    private BigDecimal official;

    //현잔고
    @Column(name = "remain_total")
    private BigDecimal remainTotal;

}
