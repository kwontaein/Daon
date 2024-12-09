package com.example.daon.controller;

import com.example.daon.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

/**
 * 회사 사원관리
 */
@RestController
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;
    
}
