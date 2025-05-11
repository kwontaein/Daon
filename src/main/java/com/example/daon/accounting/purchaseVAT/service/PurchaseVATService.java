package com.example.daon.accounting.purchaseVAT.service;

import com.example.daon.accounting.categorySelection.service.CategorySelectionService;
import com.example.daon.accounting.purchaseVAT.dto.request.PurchaseVATRequest;
import com.example.daon.accounting.purchaseVAT.dto.response.PurchaseVATResponse;
import com.example.daon.accounting.purchaseVAT.model.PurchaseVATEntity;
import com.example.daon.accounting.purchaseVAT.repository.PurchaseVATRepository;
import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.customer.repository.CustomerRepository;
import com.example.daon.global.service.GlobalService;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class PurchaseVATService {
    private final PurchaseVATRepository purchaseVATRepository;
    private final CustomerRepository customerRepository;
    private final CategorySelectionService categorySelectionService;
    private final GlobalService globalService;

    //매입부가세
    public void savePurchaseVAT(PurchaseVATRequest purchaseVATRequest) {
        CustomerEntity customer = customerRepository.findById(purchaseVATRequest.getCustomerId()).orElseThrow(() -> new RuntimeException("존재하지 않는 고객입니다."));
        categorySelectionService.findAndSave(purchaseVATRequest.getCategorySelection());
        PurchaseVATEntity purchaseVATEntity = purchaseVATRepository.save(purchaseVATRequest.toPurchaseVATEntity(customer));
        purchaseVATRequest.setPurchaseVATId(purchaseVATEntity.getPurchaseVATId());
    }

    public void updatePurchaseVAT(PurchaseVATRequest purchaseVATRequest) {
        System.out.println("purchaseVATRequest.getId : " + purchaseVATRequest.getPurchaseVATId());
        PurchaseVATEntity purchaseVATEntity = purchaseVATRepository.findById(purchaseVATRequest.getPurchaseVATId()).orElseThrow(() -> new RuntimeException("존재하지 않는 항목입니다."));
        CustomerEntity customer = customerRepository.findById(purchaseVATRequest.getCustomerId()).orElseThrow(() -> new RuntimeException("존재하지 않는 고객입니다."));
        purchaseVATEntity.updateFromRequest(purchaseVATRequest, customer);
        purchaseVATRepository.save(purchaseVATEntity);
    }

    public void deletePurchaseVAT(PurchaseVATRequest purchaseVATRequest) {
        purchaseVATRepository.deleteById(purchaseVATRequest.getPurchaseVATId());
    }

    public List<PurchaseVATResponse> getPurchaseVAT(PurchaseVATRequest purchaseVATRequest) {
        List<PurchaseVATEntity> purchaseVATEntities = purchaseVATRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();

            if (purchaseVATRequest.getPurchaseVATId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("purchaseVATId"), purchaseVATRequest.getPurchaseVATId()));
            } else {

                if (purchaseVATRequest.getSearchSDate() != null && purchaseVATRequest.getSearchEDate() != null) {
                    predicates.add(criteriaBuilder.between(root.get("date"), purchaseVATRequest.getSearchSDate(), purchaseVATRequest.getSearchEDate()));
                }

                if (purchaseVATRequest.getCustomerName() != null) {
                    predicates.add(criteriaBuilder.like(root.get("customerId").get("customerName"), "%" + purchaseVATRequest.getCustomerName() + "%"));
                }
            }
            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
        return purchaseVATEntities.stream().map(globalService::convertToPurchaseVATResponse).collect(Collectors.toList());
    }
}
