package com.example.daon.company.controller;

import com.example.daon.company.dto.request.CompanyRequest;
import com.example.daon.company.model.CompanyEntity;
import com.example.daon.company.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 회사 사원관리
 */
@RestController
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;


    //회사정보 crud
    @PostMapping("api/saveCompany")
    public void CreateCompany(@RequestBody CompanyRequest companyRequest) {
        companyService.CreateCompany(companyRequest);
    }

    @GetMapping("api/getCompany")
    public List<CompanyEntity> getCompany() {
        return companyService.getCompany();
    }

    @PostMapping("api/getCompanyDetail")
    public CompanyEntity getCompanyDetail(@RequestBody CompanyRequest companyRequest) {
        return companyService.getCompanyDetail(companyRequest);
    }


    @PostMapping("api/updateCompany")
    public void UpdateCompany(@RequestBody CompanyRequest companyRequest) {
        companyService.UpdateCompany(companyRequest);
    }

    @PostMapping("api/deleteCompany")
    public void DeleteCompany(@RequestBody CompanyRequest companyRequest) {
        companyService.DeleteCompany(companyRequest);
    }


}
