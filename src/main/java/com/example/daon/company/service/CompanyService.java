package com.example.daon.company.service;

import com.example.daon.company.dto.request.CompanyRequest;
import com.example.daon.company.model.CompanyEntity;
import com.example.daon.company.repository.CompanyRepository;
import com.example.daon.global.RedisService;
import com.example.daon.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

//회사, 사원관리
@Service
@RequiredArgsConstructor
public class CompanyService {
    private final CompanyRepository companyRepository;
    private final RedisService redisService;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final PasswordEncoder passwordEncoder;

    //회사정보 crud
    public void CreateCompany(CompanyRequest companyRequest) {
        companyRepository.save(companyRequest.toEntity());
    }

    public List<CompanyEntity> getCompany() {
        List<CompanyEntity> companyEntities = companyRepository.findAll();
        for (CompanyEntity company : companyEntities) {
            System.out.println(company.toString());
        }
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

}
