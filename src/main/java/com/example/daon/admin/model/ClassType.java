package com.example.daon.admin.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.stream.Stream;

@Getter
@RequiredArgsConstructor
public enum ClassType { //enum을 활용한 권한종류 설정
    CEO("대표"),
    DIRECTOR("이사"),
    MANAGER("과장"),
    STAFF("사원"),
    ASSISTANT_MANAGER("대리"),
    PROFESSIONAL("주임"),
    TEAM_LEADER("팀장"),
    DEPUTY_GENERAL_MANAGER("차장");

    private final String classType;

    //user_role 유효성 검사
    @JsonCreator
    public static ClassType userRoleParsing(String inputValue) {

        return Stream.of(ClassType.values())
                .filter(classType -> classType.toString().equals(inputValue))
                .findFirst()
                .orElse(STAFF);
    }

}