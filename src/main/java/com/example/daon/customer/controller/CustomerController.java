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
    public List<CustomerResponse> getCustomers(@RequestBody CustomerRequest customerRequest) {
        return customerService.getCustomers(
                customerRequest.getCategory()
                , customerRequest.getCateId()
                , customerRequest.getCustomerName()
                , customerRequest.getSearchTarget()
                , customerRequest.getCeo()
        );
    }

    @PostMapping("api/getCustomer")
    public CustomerResponse getCustomer(@RequestBody CustomerRequest customerRequest) {
        return customerService.getCustomer(customerRequest.getCustomerId());
    }

    @PostMapping("api/saveCustomer")
    public void saveCustomer(@RequestBody CustomerRequest customerRequest) {
        customerService.saveCustomer(customerRequest);
    }

    @PostMapping("api/updateCustomer")
    public void updateCustomer(@RequestBody CustomerRequest customerRequest) {
        customerService.updateCustomer(customerRequest);
    }

    @PostMapping("api/deleteCustomers")
    public void deleteCustomers(@RequestBody CustomerRequest customerRequest) {
        customerService.deleteCustomers(customerRequest);
    }

    //customerCate ------------------------------------
    @GetMapping("api/getAffiliation")
    public List<AffiliationResponse> getAffiliation() {
        return customerService.getAffiliation();
    }

    @PostMapping("api/updateAffiliation")
    public void updateAffiliation(@RequestBody List<AffiliationRequest> affiliationRequest) {
        customerService.updateAffiliation(affiliationRequest);
    }

    @PostMapping("api/saveAffiliation")
    public void saveAffiliation(@RequestBody AffiliationRequest affiliationRequest) {
        customerService.saveAffiliation(affiliationRequest);
    }

    @PostMapping("api/deleteAffiliation")
    public void deleteAffiliation(@RequestBody AffiliationRequest affiliationRequest) {
        customerService.deleteAffiliation(affiliationRequest);
    }
}
