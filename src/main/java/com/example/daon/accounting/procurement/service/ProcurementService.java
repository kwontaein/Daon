package com.example.daon.accounting.procurement.service;

import com.example.daon.accounting.categorySelection.service.CategorySelectionService;
import com.example.daon.accounting.procurement.dto.request.ProcurementRequest;
import com.example.daon.accounting.procurement.model.ProcurementEntity;
import com.example.daon.accounting.procurement.repository.ProcurementRepository;
import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.customer.repository.CustomerRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ProcurementService {

    private final ProcurementRepository procurementRepository;
    private final CustomerRepository customerRepository;
    private final CategorySelectionService categorySelectionService;

    //조달 및 수의 계산정산
    public void saveProcurement(ProcurementRequest procurementRequest) {
        CustomerEntity customer = customerRepository.findById(procurementRequest.getCustomerId()).orElseThrow(() -> new RuntimeException("잘못된 고객 아이디입니다."));
        categorySelectionService.findAndSave(procurementRequest.getCategorySelection());
        procurementRepository.save(procurementRequest.toProcurementEntity(customer));
    }

    public void updateProcurement(ProcurementRequest procurementRequest) {
        ProcurementEntity procurement = procurementRepository.findById(procurementRequest.getProcurementSettlementId()).orElseThrow(() -> new RuntimeException("존재하지 않는 항목입니다."));
        CustomerEntity customer = customerRepository.findById(procurementRequest.getCustomerId()).orElseThrow(() -> new RuntimeException("잘못된 고객 아이디입니다."));
        procurement.updateFromRequest(procurementRequest, customer);
        procurementRepository.save(procurement);
    }

    public void deleteProcurement(ProcurementRequest procurementRequest) {
        procurementRepository.deleteById(procurementRequest.getProcurementSettlementId());
    }

    public List<ProcurementEntity> getProcurement(ProcurementRequest procurementRequest) {
        return procurementRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();
            // 거래처 분류
            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }

}
