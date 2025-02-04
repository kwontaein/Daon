package com.example.daon.customer.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "customer_bills")
public class CustomerBillEntity {

    //id
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "customer_bill_id", columnDefinition = "BINARY(16)")
    private UUID id;

    //상호명
    @OneToOne
    @MapsId
    @JoinColumn(name = "customer_id") // customer 테이블의 id와 매핑
    private CustomerEntity customer;
    //전기이월
    @Column(name = "previous_balance")
    private int previousBalance;
    //매출액
    @Column(name = "sales_amount")
    private int salesAmount;
    //수금액
    @Column(name = "collection_amount")
    private int collectionAmount;
    //매입액
    @Column(name = "purchase_amount")
    private int purchaseAmount;
    //지급액
    @Column(name = "payment_amount")
    private int paymentAmount;
    //매출할인액
    @Column(name = "sales_discount")
    private int salesDiscount;
    //매입할인액
    @Column(name = "purchase_discount")
    private int purchaseDiscount;
    //잔액
    @Column(name = "current_balance")
    private int currentBalance;
}
