package com.example.daon.company.service;

import com.example.daon.company.dto.request.CompanyRequest;
import com.example.daon.company.model.CompanyEntity;
import com.example.daon.company.repository.CompanyRepository;
import com.example.daon.global.service.GlobalService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

//회사, 사원관리
@Service
@RequiredArgsConstructor
public class CompanyService {
    private final CompanyRepository companyRepository;
    private final GlobalService globalService;

    public void CreateCompany(CompanyRequest companyRequest) {
        CompanyEntity company = companyRepository.save(companyRequest.toEntity());
        companyRequest.setCompanyId(company.getCompanyId());
    }


    public List<CompanyEntity> getCompany() {
        List<CompanyEntity> companyEntities = companyRepository.findAll();
        List<CompanyEntity> reversed = new ArrayList<>(companyEntities);
        Collections.reverse(reversed);
        companyEntities.stream().map(globalService::convertToCompanyResponse).collect(Collectors.toList());
        return companyEntities;
    }

    public void UpdateCompany(CompanyRequest companyRequest) {
        CompanyEntity company = companyRepository.findById(companyRequest.getCompanyId()).orElse(null);
        company.updateFromRequest(companyRequest);
        companyRepository.save(company);
    }

    public void DeleteCompany(CompanyRequest companyRequest) {
        try {
            companyRepository.deleteById(companyRequest.getCompanyId());
        } catch (DataIntegrityViolationException e) {
            // 외래키 제약 조건 위반 처리
            throw new IllegalStateException("회사를 삭제할 수 없습니다. 관련된 데이터가 존재합니다.", e);
        }
    }

    public CompanyEntity getCompanyDetail(CompanyRequest companyRequest) {
        CompanyEntity company = companyRepository.findById(companyRequest.getCompanyId()).orElse(null);
        globalService.convertToCompanyResponse(company);
        System.out.println(company);
        return company;
    }
}
