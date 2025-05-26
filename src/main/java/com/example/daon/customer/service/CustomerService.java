package com.example.daon.customer.service;

import com.example.daon.admin.model.UserEntity;
import com.example.daon.customer.dto.request.AffiliationRequest;
import com.example.daon.customer.dto.request.CustomerRequest;
import com.example.daon.customer.dto.response.AffiliationResponse;
import com.example.daon.customer.dto.response.CustomerResponse;
import com.example.daon.customer.model.AffiliationEntity;
import com.example.daon.customer.model.CustomerBillEntity;
import com.example.daon.customer.model.CustomerCate;
import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.customer.repository.AffiliationRepository;
import com.example.daon.customer.repository.CustomerRepository;
import com.example.daon.global.exception.ResourceInUseException;
import com.example.daon.global.service.GlobalService;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final AffiliationRepository affiliationRepository;
    private final GlobalService globalService;


    public List<CustomerResponse> getCustomers(CustomerCate category, UUID cateId, String customerName, String searchTarget, String ceo) {
        List<CustomerEntity> customer = customerRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();
            // 거래처 분류
            if (category != null) {
                predicates.add(criteriaBuilder.equal(root.get("category"), category));
            }

            if (cateId != null) {
                predicates.add(criteriaBuilder.equal(root.get("customerCateId").get("customerAffiliationId"), cateId));
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
            } else if (ceo != null && !ceo.trim().isEmpty()) {// 대표자 부분 검색 (ceo 가 비어있지 않을 경우)
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

        return customer.stream()
                .map(globalService::convertToCustomerResponse)
                .collect(Collectors.toList());
    }

    public CustomerResponse getCustomer(UUID customerId) {
        CustomerEntity customer = customerRepository.findById(customerId).orElse(null);
        return globalService.convertToCustomerResponse(customer);
    }

    public void saveCustomer(CustomerRequest request) {
        UserEntity user = null;
        System.out.println(request.getUserId());
        if (request.getUserId() != null || request.getUserId().isEmpty()) {
            user = globalService.resolveUser(request.getUserId());
        }
        AffiliationEntity affiliationEntity = affiliationRepository.findById(request.getAffiliationId()).orElseThrow(() -> new RuntimeException("잘못된 소속입니다."));
        CustomerEntity customer = customerRepository.save(request.toEntity(user, affiliationEntity));
        request.setCustomerId(customer.getCustomerId());
    }

    @Transactional
    public void updateCustomer(CustomerRequest request) {
        CustomerEntity customer = customerRepository.findById(request.getCustomerId()).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 고객입니다."));
        AffiliationEntity affiliationEntity = affiliationRepository.findById(request.getAffiliationId()).orElseThrow(() -> new RuntimeException("잘못된 소속입니다."));
        customer.updateFromRequest(request, affiliationEntity);
        customerRepository.save(customer);
    }

    @Transactional
    public void deleteCustomers(CustomerRequest request) {
        try {
            customerRepository.deleteById(request.getCustomerId());
        } catch (DataIntegrityViolationException e) {
            // 외래키 제약 조건 위반 처리
            throw new ResourceInUseException("고객을 삭제할 수 없습니다. 관련된 데이터가 존재합니다.", e);
        }
    }

    public List<AffiliationResponse> getAffiliation() {
        List<AffiliationEntity> affiliationEntities = affiliationRepository.findAll();
        return affiliationEntities.stream()
                .map(globalService::convertToAffiliationResponse)
                .collect(Collectors.toList());
    }

    public void saveAffiliation(AffiliationRequest request) {
        AffiliationEntity affiliation = affiliationRepository.save(request.toEntity());
        request.setAffiliationId(affiliation.getCustomerAffiliationId());
    }

    @Transactional
    public void updateAffiliation(List<AffiliationRequest> requests) {
        for (AffiliationRequest request : requests) {
            AffiliationEntity existingEntity;
            existingEntity = affiliationRepository.findById(request.getAffiliationId()).orElse(null);

            //    기존 엔티티의 내용을 요청 DTO로 갱신하는 로직
            existingEntity.updateFromRequest(request);

            //    변경된 엔티티 저장
            affiliationRepository.save(existingEntity);
        }
    }


    @Transactional
    public void deleteAffiliation(AffiliationRequest request) {
        try {
            affiliationRepository.deleteById(request.getAffiliationId());
        } catch (DataIntegrityViolationException e) {
            // 외래키 제약 조건 위반 처리
            throw new ResourceInUseException("소속을 삭제할 수 없습니다. 관련된 데이터가 존재합니다.", e);
        }
    }

}
