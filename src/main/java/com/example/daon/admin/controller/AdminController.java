package com.example.daon.admin.controller;

import com.example.daon.admin.dto.request.CompanyRequest;
import com.example.daon.admin.dto.request.UserRequest;
import com.example.daon.admin.model.CompanyEntity;
import com.example.daon.admin.model.UserEntity;
import com.example.daon.admin.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
public class AdminController {

    private final AdminService adminService;

    @PostMapping("api/test")
    public ResponseEntity test() {
        adminService.test();
        System.out.println("api 호출");
        return ResponseEntity.ok("성공");
    }

    //로그인
    @PostMapping("api/signIn")
    public void SignIn(@RequestBody UserRequest userRequest) {
        System.out.println(userRequest.getId() + " / " + userRequest.getPassword());
        adminService.SignIn(userRequest.getId(), userRequest.getPassword());
    }

    //회사정보 crud
    @PostMapping("api/createCompany")
    public void CreateCompany(@RequestBody CompanyRequest companyRequest) {
        adminService.CreateCompany(companyRequest);
    }


    @GetMapping("api/ReadCompany")
    public List<CompanyEntity> ReadCompany() {
        return adminService.ReadCompany();
    }

    @PostMapping("api/updateCompany")
    public void UpdateCompany(@RequestBody CompanyRequest companyRequest) {
        adminService.UpdateCompany(companyRequest);
    }

    @PostMapping("api/deleteCompany")
    public void DeleteCompany(@RequestBody CompanyRequest companyRequest) {
        adminService.DeleteCompany(companyRequest);
    }


    //사원정보 crud
    @PostMapping("api/CreateEmployee")
    public void CreateEmployee(@RequestBody UserRequest userRequest) {
        adminService.CreateEmployee(userRequest);
    }

    @GetMapping("api/GetEmployees")
    public List<UserEntity> GetEmployees() {
        return adminService.GetEmployees();
    }

    @PostMapping("api/GetEmployeeDetail")
    public UserEntity GetEmployeeDetail(@RequestBody UserRequest userRequest) {
        return adminService.GetEmployeeDetail(userRequest);
    }

    @PostMapping("api/updateEmployee")
    public void UpdateEmployee(@RequestBody UserRequest userRequest) {
        adminService.UpdateEmployee(userRequest);
    }

    @PostMapping("api/deleteEmployee")
    public void DeleteEmployee(@RequestBody UserRequest userRequest) {
        adminService.DeleteEmployee(userRequest);
    }

}
