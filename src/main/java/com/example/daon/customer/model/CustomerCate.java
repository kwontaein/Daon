package com.example.daon.customer.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.stream.Stream;

@Getter
@RequiredArgsConstructor
public enum CustomerCate {

    SALE("판매처"),
    BUY("구매처"),
    CONSUMER("소비자"),
    WORK("하청업체"),
    ETC("기타");

    private final String cate;

    //user_role 유효성 검사
    @JsonCreator
    public static CustomerCate positionParsing(String inputValue) {

        return Stream.of(CustomerCate.values())
                .filter(customerCate -> customerCate.toString().equals(inputValue))
                .findFirst()
                .orElse(ETC);
    }
}
