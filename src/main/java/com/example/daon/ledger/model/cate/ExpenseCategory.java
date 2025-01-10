package com.example.daon.ledger.model.cate;

import com.example.daon.sales.model.ReceiptCategory;
import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.stream.Stream;

@Getter
@RequiredArgsConstructor
public enum ExpenseCategory {
    DAON("다온정보");

    private final String cate;

    //user_role 유효성 검사
    @JsonCreator
    public static ExpenseCategory positionParsing(String inputValue) {

        return Stream.of(ExpenseCategory.values())
                .filter(expenseCategory -> expenseCategory.toString().equals(inputValue))
                .findFirst()
                .orElse(DAON);
    }
}
