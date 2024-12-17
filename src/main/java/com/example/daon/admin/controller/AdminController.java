package com.example.daon.admin.controller;

import com.example.daon.admin.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 회사 사원관리
 */
@RestController
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    //로그인
    @PostMapping("api/SignIn")
    public void SignIn() {
    }

    //회원가입
    @PostMapping("api/SignUp")
    public void SignUp() {
    }


    //회사정보 crud
    @PostMapping("api/CreateCompany")
    public void CreateCompany() {
        adminService.CreateCompany();
    }

    @PostMapping("api/ReadCompany")
    public void ReadCompany() {
        adminService.ReadCompany();
    }

    @PostMapping("api/UpdateCompany")
    public void UpdateCompany() {
        adminService.UpdateCompany();
    }

    @PostMapping("api/DeleteCompany")
    public void DeleteCompany() {
        adminService.DeleteCompany();
    }


    //사원정보 crud
    @PostMapping("api/CreateEmployee")
    public void CreateEmployee() {
        adminService.CreateEmployee();
    }

    @PostMapping("api/ReadEmployee")
    public void ReadEmployee() {
        adminService.ReadEmployee();
    }

    @PostMapping("api/UpdateEmployee")
    public void UpdateEmployee() {
        adminService.UpdateEmployee();
    }

    @PostMapping("api/DeleteEmployee")
    public void DeleteEmployee() {
        adminService.DeleteEmployee();
    }


}
