package com.example.daon.customer.service;

import com.example.daon.admin.model.UserEntity;
import com.example.daon.admin.repository.UserRepository;
import com.example.daon.customer.dto.request.CustomerCateRequest;
import com.example.daon.customer.dto.request.CustomerRequest;
import com.example.daon.customer.model.CustomerBillEntity;
import com.example.daon.customer.model.CustomerCate;
import com.example.daon.customer.model.CustomerCateEntity;
import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.customer.repository.CustomerCateRepository;
import com.example.daon.customer.repository.CustomerRepository;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;
    private final CustomerCateRepository customerCateRepository;

    public List<CustomerEntity> getCustomers(CustomerCate category, UUID cateId, String customerName, String searchTarget, String ceo) {
        return customerRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();
            // 거래처 분류
            if (category != null) {
                predicates.add(criteriaBuilder.equal(root.get("category"), category));
            }

            if (cateId != null) {
                CustomerCateEntity customerCateEntity = customerCateRepository.findById(cateId).orElse(null);
                // 거래처 소속
                if (customerCateEntity != null) {
                    predicates.add(criteriaBuilder.equal(root.get("customerCateId"), customerCateEntity));
                }
            }

            // 고객명 부분 검색 (customerName 이 비어있지 않을 경우)
            if (customerName != null && !customerName.trim().isEmpty()) {
                System.out.println("customerName : " + customerName);
                // customerName 이 비어있지 않을 때 OR 조건 사용
                predicates.add(
                        criteriaBuilder.or(
                                criteriaBuilder.like(root.get("customerName"), "%" + customerName + "%"),
                                // 필요한 경우 아래와 같이 다른 조건을 함께 OR로 묶을 수 있음
                                criteriaBuilder.like(root.get("etc"), "%" + customerName + "%")
                        )
                );
            } else if (ceo != null && !ceo.trim().isEmpty()) {// 대표자 부분 검색 (ceo 가 비어있지 않을 경우)
                System.out.println("ceo : " + ceo);
                predicates.add(criteriaBuilder.like(root.get("ceo"), "%" + ceo + "%"));
            }

            // (5) searchTarget 이 'payment' 라면, customerBills 의 currentBalance 값이 0이 아닌 조건 추가
            if (searchTarget != null && searchTarget.equals("payment")) {
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
        CustomerCateEntity customerCateEntity = customerCateRepository.findById(request.getCateId()).orElseThrow(() -> new RuntimeException("잘못된 소속입니다."));
        customerRepository.save(request.toEntity(user, customerCateEntity));
    }

    @Transactional
    public void updateCustomer(CustomerRequest request) {
        CustomerEntity customer = customerRepository.findById(request.getCustomerId()).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 고객입니다."));
        CustomerCateEntity customerCateEntity = customerCateRepository.findById(request.getCateId()).orElseThrow(() -> new RuntimeException("잘못된 소속입니다."));
        customer.updateFromRequest(request, customerCateEntity);
        customerRepository.save(customer);
    }

    @Transactional
    public void deleteCustomers(CustomerRequest request) {
        customerRepository.deleteById(request.getCustomerId());
    }

    public List<CustomerCateEntity> getCustomerCate() {
        return customerCateRepository.findAll();
    }

    public void saveCustomerCate(CustomerCateRequest request) {
        customerCateRepository.save(request.toEntity());
    }

    @Transactional
    public void updateCustomerCate(List<CustomerCateRequest> requests) {
        for (CustomerCateRequest request : requests) {
            CustomerCateEntity existingEntity;
            existingEntity = customerCateRepository.findById(request.getCustomerCateId()).orElse(null);

            //    기존 엔티티의 내용을 요청 DTO로 갱신하는 로직
            existingEntity.updateFromRequest(request);

            //    변경된 엔티티 저장
            customerCateRepository.save(existingEntity);
        }
    }


    @Transactional
    public void deleteCustomerCate(CustomerCateRequest request) {
        customerCateRepository.deleteById(request.getCustomerCateId());
    }
}
