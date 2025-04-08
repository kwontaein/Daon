package com.example.daon.accounting.salesVAT.service;

import com.example.daon.accounting.salesVAT.dto.request.SalesVATRequest;
import com.example.daon.accounting.salesVAT.model.SalesVATEntity;
import com.example.daon.accounting.salesVAT.repository.SalesVATRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class SalesVATService {

    private final SalesVATRepository salesVATRepository;

    //매출부가세
    public void saveSalesVAT(SalesVATRequest salesVATRequest) {
        salesVATRepository.save(salesVATRequest.toSalesVATEntity());
    }

    public void updateSalesVAT(SalesVATRequest salesVATRequest) {
        SalesVATEntity salesVATEntity = salesVATRepository.findById(salesVATRequest.getSalesVATId()).orElseThrow(() -> new RuntimeException("존재하지 않는 항목입니다."));
        salesVATEntity.updateFromRequest(salesVATRequest);
        salesVATRepository.save(salesVATEntity);
    }

    public void deleteSalesVAT(SalesVATRequest salesVATRequest) {
        salesVATRepository.deleteById(salesVATRequest.getSalesVATId());
    }

    public void getSalesVAT(SalesVATRequest salesVATRequest) {
        salesVATRepository.findById(salesVATRequest.getSalesVATId());
    }

    public void paidSalesVAT(SalesVATRequest salesVATRequest) {
        SalesVATEntity salesVATEntity = salesVATRepository.findById(salesVATRequest.getSalesVATId()).orElseThrow(() -> new RuntimeException("존재하지 않는 항목입니다."));
        salesVATEntity.updateFromRequest(salesVATRequest);
        salesVATRepository.save(salesVATEntity);
    }
}
