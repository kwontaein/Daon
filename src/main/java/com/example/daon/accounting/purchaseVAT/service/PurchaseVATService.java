package com.example.daon.accounting.purchaseVAT.service;

import com.example.daon.accounting.purchaseVAT.dto.request.PurchaseVATRequest;
import com.example.daon.accounting.purchaseVAT.model.PurchaseVATEntity;
import com.example.daon.accounting.purchaseVAT.repository.PurchaseVATRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class PurchaseVATService {
    private final PurchaseVATRepository purchaseVATRepository;

    //매입부가세
    public void savePurchaseVAT(PurchaseVATRequest purchaseVATRequest) {
        purchaseVATRepository.save(purchaseVATRequest.toPurchaseVATEntity());
    }

    public void updatePurchaseVAT(PurchaseVATRequest purchaseVATRequest) {
        PurchaseVATEntity purchaseVATEntity = purchaseVATRepository.findById(purchaseVATRequest.getPurchaseVATId()).orElseThrow(() -> new RuntimeException("존재하지 않는 항목입니다."));
        purchaseVATEntity.updateFromRequest(purchaseVATRequest);
        purchaseVATRepository.save(purchaseVATEntity);
    }

    public void deletePurchaseVAT(PurchaseVATRequest purchaseVATRequest) {
        purchaseVATRepository.deleteById(purchaseVATRequest.getPurchaseVATId());
    }

    public void getPurchaseVAT(PurchaseVATRequest purchaseVATRequest) {
        List<PurchaseVATEntity> purchaseVATEntities = purchaseVATRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();
            // 거래처 분류
            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }
}
