package com.example.daon.customer.service;

import com.example.daon.admin.model.UserEntity;
import com.example.daon.admin.repository.UserRepository;
import com.example.daon.customer.dto.request.CustomerRequest;
import com.example.daon.customer.model.CustomerBillEntity;
import com.example.daon.customer.model.CustomerCateEntity;
import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.customer.repository.CustomerCateRepository;
import com.example.daon.customer.repository.CustomerRepository;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;
    private final CustomerCateRepository customerCateRepository;

    public List<CustomerEntity> getCustomers(String category, UUID cateId, String customerName, String ceo, String searchTarget) {
        return customerRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();
            // 거래처 분류
            if (category != null) {
                predicates.add(criteriaBuilder.equal(root.get("category"), category));
            }
            CustomerCateEntity customerCateEntity = null;
            if (cateId != null) {
                customerCateEntity = customerCateRepository.findById(cateId).orElse(null);
            }
            // 거래처 소속
            if (customerCateEntity != null) {
                predicates.add(criteriaBuilder.equal(root.get("cateId"), cateId));
            }

            // 대표자 부분 검색 (ceo 가 비어있지 않을 경우)
            if (ceo != null && !ceo.trim().isEmpty()) {
                predicates.add(criteriaBuilder.like(root.get("ceo"), "%" + ceo + "%"));
            }

            // 고객명 부분 검색 (customerName 이 비어있지 않을 경우)
            if (customerName != null && !customerName.trim().isEmpty()) {
                // customerName 이 비어있지 않을 때 OR 조건 사용
                predicates.add(
                        criteriaBuilder.or(
                                criteriaBuilder.like(root.get("customerName"), "%" + customerName + "%"),
                                // 필요한 경우 아래와 같이 다른 조건을 함께 OR로 묶을 수 있음
                                criteriaBuilder.like(root.get("etc"), "%" + customerName + "%")
                        )
                );
            }

            // (5) searchTarget 이 'payment' 라면, customerBills 의 currentBalance 값이 0이 아닌 조건 추가
            if ("payment".equals(searchTarget)) {
                // customerBills 엔티티에 조인
                Join<CustomerEntity, CustomerBillEntity> billsJoin = root.join("customerBills", JoinType.INNER);
                predicates.add(criteriaBuilder.notEqual(billsJoin.get("currentBalance"), 0));
            }

            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }

    public void saveCustomer(CustomerRequest request) {
        UserEntity user = userRepository.findById(request.getUserId()).orElse(null);
        customerRepository.save(request.toEntity(user));
    }

    public void deleteCustomers(CustomerRequest request) {
        customerRepository.deleteById(request.getCustomerId());
    }

    public List<CustomerCateEntity> getCustomerCate() {
        return customerCateRepository.findAll();
    }
}
