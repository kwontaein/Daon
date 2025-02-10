package com.example.daon.stock.model.cate;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.stream.Stream;

@Getter
@RequiredArgsConstructor
public enum TaxationCate {

    EXEMPTION("비과세"),
    TAXATION("과세"),
    ZEROTAX("영세"),
    MC("관리비"),
    ETC("예비");

    private final String cate;

    //user_role 유효성 검사
    @JsonCreator
    public static TaxationCate positionParsing(String inputValue) {

        return Stream.of(TaxationCate.values())
                .filter(taxationCate -> taxationCate.toString().equals(inputValue))
                .findFirst()
                .orElse(ETC);
    }
}
