package com.example.daon.admin.dto.request;

import com.example.daon.admin.model.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
    //아이디
    private String id;

    //비밀번호
    private String password;

    //기혼여부
    private boolean married;

    //가입일
    private boolean joinDate;

    //생일
    private boolean birthday;

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
    private UserEntity.ClassType userClass;

    //관리자권한 -> enum
    private UserEntity.RoleType userRole;

    //부서 -> enum
    private UserEntity.Position position;


    public UserEntity toEntity() {
        return UserEntity.builder()
                .id(id)
                .password(password)
                .married(married)
                .joinDate(joinDate)
                .birthday(birthday)
                .name(name)
                .engName(engName)
                .chName(chName)
                .zipcode(zipcode)
                .address(address)
                .addressDetail(addressDetail)
                .tel(tel)
                .phone(phone)
                .email(email)
                .memo(memo)
                .userClass(userClass)
                .userRole(userRole)
                .position(position)
                .build();
    }
}
