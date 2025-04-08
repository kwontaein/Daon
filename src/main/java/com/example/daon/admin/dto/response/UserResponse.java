package com.example.daon.admin.dto.response;

import com.example.daon.admin.model.ClassType;
import com.example.daon.admin.model.DeptEntity;
import com.example.daon.admin.model.RoleType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse { //아이디
    private String id;

    //비밀번호
    private String password;

    //기혼여부
    private boolean married;

    //가입일
    private Timestamp joinDate;

    //생일
    private Timestamp birthday;

    //이름
    private String name;

    //영어이름
    private String engName;

    //한자이름
    private String chName;

    //우편번호
    private String zipcode;

    //주소
    private String address;

    //상세주소
    private String addressDetail;

    //집전화
    private String tel;

    //휴대전화
    private String phone;

    //이메일
    private String email;

    //비고
    private String memo;

    //직위 -> enum
    private ClassType userClass;

    //관리자권한 -> enum
    private RoleType userRole;

    //부서 -> enum
    private String position;

    private DeptEntity dept;
}
