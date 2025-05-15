package com.example.daon.admin.controller;

import com.example.daon.admin.dto.request.DeptRequest;
import com.example.daon.admin.dto.request.EnableUrlRequest;
import com.example.daon.admin.dto.request.UserRequest;
import com.example.daon.admin.dto.response.EnableUrlResponse;
import com.example.daon.admin.dto.response.UserResponse;
import com.example.daon.admin.model.DeptEntity;
import com.example.daon.admin.service.AdminService;
import jakarta.servlet.http.HttpServletResponse;
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

    //로그인
    @PostMapping("api/signIn")
    public ResponseEntity<String> SignIn(@RequestBody UserRequest userRequest, HttpServletResponse response) {
        return adminService.SignIn(userRequest.getUserId(), userRequest.getPassword(), response);
    }


    //사원정보 crud
    @PostMapping("api/saveEmployee")
    public void saveEmployee(@RequestBody UserRequest userRequest) {
        adminService.CreateEmployee(userRequest);
    }

    @GetMapping("api/getEmployees")
    public List<UserResponse> GetEmployees() {
        return adminService.GetEmployees();
    }

    @PostMapping("api/getEmployeeDetail")
    public UserResponse GetEmployeeDetail(@RequestBody UserRequest userRequest) {
        return adminService.GetEmployeeDetail(userRequest);
    }

    @GetMapping("api/getMyDetail")
    public UserResponse getMyDetail() {
        return adminService.getMyDetail();
    }

    @PostMapping("api/updateEmployee")
    public void UpdateEmployee(@RequestBody UserRequest userRequest) {
        adminService.UpdateEmployee(userRequest);
    }

    @PostMapping("api/deleteEmployee")
    public void DeleteEmployee(@RequestBody UserRequest userRequest) {
        adminService.DeleteEmployee(userRequest);
    }


    @GetMapping("api/getDept")
    public List<DeptEntity> getDept() {
        return adminService.getDept();
    }

    @PostMapping("api/saveDept")
    public void saveDept(@RequestBody DeptRequest deptRequest) {
        adminService.CreateDept(deptRequest);
    }

    @PostMapping("api/updateDept")
    public void UpdateDept(@RequestBody List<DeptRequest> deptRequests) {
        adminService.UpdateDept(deptRequests);
    }

    @PostMapping("api/deleteDept")
    public void DeleteDept(@RequestBody DeptRequest deptRequest) {
        adminService.DeleteDept(deptRequest);
    }

    @PostMapping("api/duplicationCheck")
    public boolean duplicationCheck(@RequestBody UserRequest userRequest) {
        return adminService.duplicationCheck(userRequest.getUserId());
    }

    @PostMapping("api/updateEnableUrl")
    public ResponseEntity<String> UpdateEnableUrl(@RequestBody EnableUrlRequest enableUrlRequest, HttpServletResponse response) {
        return adminService.UpdateEnableUrl(enableUrlRequest, response);
    }

    @PostMapping("api/updateEnableUrlCookie")
    public ResponseEntity<String> updateEnableUrlCookie(@RequestBody EnableUrlRequest enableUrlRequest, HttpServletResponse response) {
        return adminService.UpdateEnableUrlCookie(enableUrlRequest, response);
    }

    @PostMapping("api/getEnableUrl")
    public EnableUrlResponse getEnableUrl(@RequestBody EnableUrlRequest enableUrlRequest) {
        return adminService.getEnableUrl(enableUrlRequest);
    }

    @GetMapping("api/test")
    public void test() {
        adminService.test();
    }
}
