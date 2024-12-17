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

    //부서 crud

    @PostMapping("api/CreateDepartment")
    public void CreateDepartment() {
        adminService.CreateDepartment();
    }

    @PostMapping("api/ReadDepartment")
    public void ReadDepartment() {
        adminService.ReadDepartment();
    }

    @PostMapping("api/UpdateDepartment")
    public void UpdateDepartment() {
        adminService.UpdateDepartment();
    }

    @PostMapping("api/DeleteDepartment")
    public void DeleteDepartment() {
        adminService.DeleteDepartment();
    }

    //직급 crud

    @PostMapping("api/CreateRank")
    public void CreateRank() {
        adminService.CreateRank();
    }

    @PostMapping("api/ReadRank")
    public void ReadRank() {
        adminService.ReadRank();
    }

    @PostMapping("api/UpdateRank")
    public void UpdateRank() {
        adminService.UpdateRank();
    }

    @PostMapping("api/DeleteRank")
    public void DeleteRank() {
        adminService.DeleteRank();
    }

}
