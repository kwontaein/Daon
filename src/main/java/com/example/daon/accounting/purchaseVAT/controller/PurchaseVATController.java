package com.example.daon.accounting.purchaseVAT.controller;

import com.example.daon.accounting.purchaseVAT.dto.request.PurchaseVATRequest;
import com.example.daon.accounting.purchaseVAT.dto.response.PurchaseVATResponse;
import com.example.daon.accounting.purchaseVAT.service.PurchaseVATService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PurchaseVATController {
    private final PurchaseVATService purchaseVATService;

    //매입부가세
    @PostMapping("api/savePurchaseVAT")
    public void savePurchaseVAT(@RequestBody PurchaseVATRequest purchaseVATRequest) {
        purchaseVATService.savePurchaseVAT(purchaseVATRequest);
    }

    @PostMapping("api/updatePurchaseVAT")
    public void updatePurchaseVAT(@RequestBody PurchaseVATRequest purchaseVATRequest) {
        purchaseVATService.updatePurchaseVAT(purchaseVATRequest);
    }

    @PostMapping("api/deletePurchaseVAT")
    public void deletePurchaseVAT(@RequestBody PurchaseVATRequest purchaseVATRequest) {
        purchaseVATService.deletePurchaseVAT(purchaseVATRequest);
    }

    @PostMapping("api/getPurchaseVAT")
    public List<PurchaseVATResponse> getPurchaseVAT(@RequestBody PurchaseVATRequest purchaseVATRequest) {
        return purchaseVATService.getPurchaseVAT(purchaseVATRequest);
    }

}
