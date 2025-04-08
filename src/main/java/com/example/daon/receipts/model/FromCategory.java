package com.example.daon.receipts.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.stream.Stream;

@Getter
@RequiredArgsConstructor
public enum FromCategory {
    EX("그외"),//전체
    ESTIMATE("견적서"),//전체
    SALES("매출부가세"),              // 매출
    CARD("카드지출"),     // 매출할인
    EXPENSE("지출증빙");  // 반품입고


    private final String cate;

    //user_role 유효성 검사
    @JsonCreator
    public static FromCategory positionParsing(String inputValue) {

        return Stream.of(FromCategory.values())
                .filter(fromCategory -> fromCategory.toString().equals(inputValue))
                .findFirst()
                .orElse(EX);
    }
}
