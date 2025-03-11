package com.example.daon.customer.controller;

import com.example.daon.customer.dto.request.AffiliationRequest;
import com.example.daon.customer.dto.request.CustomerRequest;
import com.example.daon.customer.dto.response.AffiliationResponse;
import com.example.daon.customer.dto.response.CustomerResponse;
import com.example.daon.customer.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 고객 관리
 */

@RestController
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping("api/getCustomers")
    public List<CustomerResponse> getCustomers(@RequestBody CustomerRequest request) {
        return customerService.getCustomers(
                request.getCategory()
                , request.getCateId()
                , request.getCustomerName()
                , request.getSearchTarget()
                , request.getCeo()
        );
    }

    @PostMapping("api/getCustomer")
    public CustomerResponse getCustomer(@RequestBody CustomerRequest request) {
        return customerService.getCustomer(request.getCustomerId());
    }

    @PostMapping("api/saveCustomer")
    public void saveCustomer(@RequestBody CustomerRequest request) {
        customerService.saveCustomer(request);
    }

    @PostMapping("api/updateCustomer")
    public void updateCustomer(@RequestBody CustomerRequest request) {
        customerService.updateCustomer(request);
    }

    @PostMapping("api/deleteCustomers")
    public void deleteCustomers(@RequestBody CustomerRequest request) {
        customerService.deleteCustomers(request);
    }

    //customerCate ------------------------------------
    @GetMapping("api/getAffiliation")
    public List<AffiliationResponse> getAffiliation() {
        return customerService.getAffiliation();
    }

    @PostMapping("api/updateAffiliation")
    public void updateAffiliation(@RequestBody List<AffiliationRequest> request) {
        customerService.updateAffiliation(request);
    }

    @PostMapping("api/saveAffiliation")
    public void saveAffiliation(@RequestBody AffiliationRequest request) {
        customerService.saveAffiliation(request);
    }

    @PostMapping("api/deleteAffiliation")
    public void deleteAffiliation(@RequestBody AffiliationRequest request) {
        customerService.deleteAffiliation(request);
    }
}
