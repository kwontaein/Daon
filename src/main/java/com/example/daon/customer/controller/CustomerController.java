package com.example.daon.customer.controller;

import com.example.daon.customer.dto.request.CustomerCateRequest;
import com.example.daon.customer.dto.request.CustomerRequest;
import com.example.daon.customer.model.CustomerCateEntity;
import com.example.daon.customer.model.CustomerEntity;
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
    public List<CustomerEntity> getCustomers(@RequestBody CustomerRequest request) {
        System.out.println("고객정보 받아오기 : " + request.toString());
        System.out.println(customerService.getCustomers(request.getCategory()
                , request.getCateId()
                , request.getCustomerName()
                , request.getSearchTarget()
                , request.getCeo()
        ));
        return customerService.getCustomers(request.getCategory()
                , request.getCateId()
                , request.getCustomerName()
                , request.getSearchTarget()
                , request.getCeo()
        );
    }

    @PostMapping("api/saveCustomer")
    public void saveCustomer(@RequestBody CustomerRequest request) {
        customerService.saveCustomer(request);
    }

    @PostMapping("api/deleteCustomers")
    public void deleteCustomers(@RequestBody CustomerRequest request) {
        customerService.deleteCustomers(request);
    }

    //customerCate ------------------------------------
    @GetMapping("api/getCustomerCate")
    public List<CustomerCateEntity> getCustomerCate() {
        return customerService.getCustomerCate();
    }

    @PostMapping("api/saveCustomerCate")
    public void saveCustomerCate(@RequestBody List<CustomerCateRequest> request) {
        customerService.saveCustomerCate(request);
    }

    @PostMapping("api/deleteCustomerCate")
    public void deleteCustomerCate(@RequestBody CustomerCateRequest request) {
        customerService.deleteCustomerCate(request);
    }
}
