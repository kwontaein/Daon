package com.example.daon.accounting.procurement.service;

import com.example.daon.accounting.categorySelection.service.CategorySelectionService;
import com.example.daon.accounting.procurement.dto.request.ProcurementRequest;
import com.example.daon.accounting.procurement.dto.response.ProcurementResponse;
import com.example.daon.accounting.procurement.model.ProcurementEntity;
import com.example.daon.accounting.procurement.repository.ProcurementRepository;
import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.customer.repository.CustomerRepository;
import com.example.daon.global.exception.ResourceInUseException;
import com.example.daon.global.service.GlobalService;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class ProcurementService {

    private final ProcurementRepository procurementRepository;
    private final CustomerRepository customerRepository;
    private final CategorySelectionService categorySelectionService;
    private final GlobalService globalService;

    //조달 및 수의 계산정산
    public void saveProcurement(ProcurementRequest procurementRequest) {
        CustomerEntity customer = customerRepository.findById(procurementRequest.getCustomerId()).orElseThrow(() -> new RuntimeException("잘못된 고객 아이디입니다."));
        categorySelectionService.findAndSave(procurementRequest.getCategorySelection());
        ProcurementEntity procurement = procurementRepository.save(procurementRequest.toProcurementEntity(customer));
        procurementRequest.setProcurementSettlementId(procurement.getProcurementSettlementId());
    }

    public void updateProcurement(ProcurementRequest procurementRequest) {
        ProcurementEntity procurement = procurementRepository.findById(procurementRequest.getProcurementSettlementId()).orElseThrow(() -> new RuntimeException("존재하지 않는 항목입니다."));
        CustomerEntity customer = customerRepository.findById(procurementRequest.getCustomerId()).orElseThrow(() -> new RuntimeException("잘못된 고객 아이디입니다."));
        procurement.updateFromRequest(procurementRequest, customer);
        procurementRepository.save(procurement);
    }

    public void deleteProcurement(ProcurementRequest procurementRequest) {
        try {
            procurementRepository.deleteById(procurementRequest.getProcurementSettlementId());
        } catch (Exception e) {
            throw new ResourceInUseException("조달및수의정산을 삭제할 수 없습니다. 관련된 데이터가 존재합니다.", e);
        }

    }

    public List<ProcurementResponse> getProcurement(ProcurementRequest procurementRequest) {
        List<ProcurementEntity> procurementEntities = procurementRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();

            if (procurementRequest.getProcurementSettlementId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("procurementSettlementId"), procurementRequest.getProcurementSettlementId()));
            } else {

                if (procurementRequest.getSearchSDate() != null && procurementRequest.getSearchEDate() != null) {
                    predicates.add(criteriaBuilder.between(root.get("date"), procurementRequest.getSearchSDate(), procurementRequest.getSearchEDate()));
                }

                if (procurementRequest.getCustomerName() != null) {
                    predicates.add(criteriaBuilder.like(root.get("customerId").get("customerName"), "%" + procurementRequest.getCustomerName() + "%"));
                }
            }
            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
        return procurementEntities.stream().map(globalService::convertToProcurementResponse).collect(Collectors.toList());
    }

}
