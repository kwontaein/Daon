package com.example.daon.customer.controller;

import com.example.daon.customer.dto.request.CustomerRequest;
import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.customer.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 고객 관리
 */

@RestController
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping("api/getCustomers")
    public List<CustomerEntity> getCustomers(CustomerRequest request) {
        return customerService.getCustomers(request.getCategory(), request.getCateId(), request.getUserId());
    }

    @PostMapping("api/saveCustomer")
    public void saveCustomer() {
        customerService.saveCustomer();
    }

    @PostMapping("api/deleteCustomers")
    public void deleteCustomers() {
        customerService.deleteCustomers();
    }

}
