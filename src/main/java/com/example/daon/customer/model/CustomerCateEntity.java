package com.example.daon.customer.model;

import com.example.daon.customer.dto.request.CustomerCateRequest;
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
@Table(name = "customer_cate")
public class CustomerCateEntity {
    //고객분류

    //아이디
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "customer_cate_id", columnDefinition = "BINARY(16)")
    private UUID customerCateId;

    //이름
    @Column(name = "customer_cate_name")
    private String customerCateName;

    public void updateFromRequest(CustomerCateRequest request) {
        this.customerCateName = request.getCustomerCateName();
        // 필요한 필드 추가 업데이트
    }
}
