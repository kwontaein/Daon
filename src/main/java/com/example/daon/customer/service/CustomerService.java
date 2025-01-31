package com.example.daon.customer.service;

import com.example.daon.admin.model.UserEntity;
import com.example.daon.admin.repository.UserRepository;
import com.example.daon.customer.dto.request.CustomerRequest;
import com.example.daon.customer.model.CustomerCateEntity;
import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.customer.repository.CustomerCateRepository;
import com.example.daon.customer.repository.CustomerRepository;
import jakarta.persistence.criteria.Join;
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

    public List<CustomerEntity> getCustomers(String category, UUID cateId, String userId) {
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

            // 담당기사
            if (userId != null) {
                Join<CustomerEntity, UserEntity> userJoin = root.join("user"); // 'user'는 외래 키 필드 이름
                predicates.add(criteriaBuilder.equal(userJoin.get("id"), userId));
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
}
