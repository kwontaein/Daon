package com.example.daon.accounting.salesVAT.controller;

import com.example.daon.accounting.salesVAT.dto.request.SalesVATRequest;
import com.example.daon.accounting.salesVAT.model.SalesVATEntity;
import com.example.daon.accounting.salesVAT.service.SalesVATService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class SalesVATController {

    private final SalesVATService salesVATService;

    //매출부가세 -> 전표전환
    @PostMapping("api/saveSalesVAT")
    public void saveSalesVAT(@RequestBody SalesVATRequest salesVATRequest) {
        salesVATService.saveSalesVAT(salesVATRequest);
    }

    @PostMapping("api/updateSalesVAT")
    public void updateSalesVAT(@RequestBody SalesVATRequest salesVATRequest) {
        salesVATService.updateSalesVAT(salesVATRequest);

    }

    @PostMapping("api/deleteSalesVAT")
    public void deleteSalesVAT(@RequestBody SalesVATRequest salesVATRequest) {
        salesVATService.deleteSalesVAT(salesVATRequest);
    }

    @PostMapping("api/getSalesVAT")
    public List<SalesVATEntity> getSalesVAT(@RequestBody SalesVATRequest salesVATRequest) {
        return salesVATService.getSalesVAT(salesVATRequest);
    }

    @PostMapping("api/paidSalesVAT")
    public void paidSalesVAT(@RequestBody SalesVATRequest salesVATRequest) {
        salesVATService.paidSalesVAT(salesVATRequest);
    }
}
