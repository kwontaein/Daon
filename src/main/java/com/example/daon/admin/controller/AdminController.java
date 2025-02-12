package com.example.daon.admin.controller;

import com.example.daon.admin.dto.request.CompanyRequest;
import com.example.daon.admin.dto.request.UserRequest;
import com.example.daon.admin.model.UserEntity;
import com.example.daon.admin.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    @PostMapping("api/SignIn")
    public void SignIn(@RequestBody UserRequest userRequest) {
        System.out.println(userRequest.getId() + " / " + userRequest.getPassword());
        adminService.SignIn(userRequest.getId(), userRequest.getPassword());
    }

    //회사정보 crud
    @PostMapping("api/CreateCompany")
    public void CreateCompany(@RequestBody CompanyRequest companyRequest) {
        adminService.CreateCompany(companyRequest);
    }

    @PostMapping("api/ReadCompany")
    public void ReadCompany() {
        adminService.ReadCompany();
    }

    @PostMapping("api/UpdateCompany")
    public void UpdateCompany(@RequestBody CompanyRequest companyRequest) {
        adminService.UpdateCompany(companyRequest);
    }

    @PostMapping("api/DeleteCompany")
    public void DeleteCompany(@RequestBody CompanyRequest companyRequest) {
        adminService.DeleteCompany(companyRequest);
    }


    //사원정보 crud
    @PostMapping("api/CreateEmployee")
    public void CreateEmployee(@RequestBody UserRequest userRequest) {
        adminService.CreateEmployee(userRequest);
    }

    @PostMapping("api/GetEmployee")
    public List<UserEntity> GetEmployee() {
        return adminService.GetEmployee();
    }

    @PostMapping("api/UpdateEmployee")
    public void UpdateEmployee(@RequestBody UserRequest userRequest) {
        adminService.UpdateEmployee(userRequest);
    }

    @PostMapping("api/DeleteEmployee")
    public void DeleteEmployee(@RequestBody UserRequest userRequest) {
        adminService.DeleteEmployee(userRequest);
    }

}
