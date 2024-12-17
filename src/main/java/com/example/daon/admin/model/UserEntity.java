package com.example.daon.admin.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class UserEntity {
    //아이디 
    @Id
    private String id;

    //비밀번호
    private String password;

    //기혼여부


    //가입일
    //생일
    //관리자번호
    //이름
    //영어이름
    //한자이름
    //우편번호
    //주소
    //상세주소
    //집전화
    //휴대전화
    //이메일
    //혈액형
    //직위 -> enum
    //관리자권한 -> enum
    //비고
    //부서 -> enum

}
