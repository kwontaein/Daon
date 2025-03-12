package com.example.daon.company.service;

import com.example.daon.company.dto.request.CompanyRequest;
import com.example.daon.company.model.CompanyEntity;
import com.example.daon.company.repository.CompanyRepository;
import com.example.daon.global.service.GlobalService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

//회사, 사원관리
@Service
@RequiredArgsConstructor
public class CompanyService {
    private final CompanyRepository companyRepository;
    private final GlobalService globalService;

    public void CreateCompany(CompanyRequest companyRequest) {
        companyRepository.save(companyRequest.toEntity());
    }


    public List<CompanyEntity> getCompany() {
        List<CompanyEntity> companyEntities = companyRepository.findAll();
        companyEntities.stream().map(globalService::convertToCompanyResponse).collect(Collectors.toList());
        return companyEntities;
    }

    public void UpdateCompany(CompanyRequest companyRequest) {
        CompanyEntity company = companyRepository.findById(companyRequest.getCompanyId()).orElse(null);
        company.updateFromRequest(companyRequest);
        companyRepository.save(company);
    }

    public void DeleteCompany(CompanyRequest companyRequest) {
        companyRepository.deleteById(companyRequest.getCompanyId());
    }

    public CompanyEntity getCompanyDetail(CompanyRequest companyRequest) {
        CompanyEntity company = companyRepository.findById(companyRequest.getCompanyId()).orElse(null);
        globalService.convertToCompanyResponse(company);
        return company;
    }
}
