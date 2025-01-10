package com.example.daon.admin.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.stream.Stream;

@Getter
@RequiredArgsConstructor
public enum RoleType { //enum을 활용한 권한종류 설정
    USER("사용자"),
    ADMIN("관리자"),
    MANAGER("매니저");

    private final String role;

    //user_role 유효성 검사
    @JsonCreator
    public static RoleType userRoleParsing(String inputValue) {

        return Stream.of(RoleType.values())
                .filter(roleType -> roleType.toString().equals(inputValue))
                .findFirst()
                .orElse(USER);
    }

}
