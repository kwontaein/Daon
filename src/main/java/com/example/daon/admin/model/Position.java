package com.example.daon.admin.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.stream.Stream;

@Getter
@RequiredArgsConstructor
public enum Position { //enum을 활용한 권한종류 설정
    WEB("웹관리팀"),
    BUSINESS("영업부"),
    ELSE("기타"),
    MANAGE("관리부");

    private final String position;

    //user_role 유효성 검사
    @JsonCreator
    public static Position positionParsing(String inputValue) {

        return Stream.of(Position.values())
                .filter(position -> position.toString().equals(inputValue))
                .findFirst()
                .orElse(BUSINESS);
    }

}