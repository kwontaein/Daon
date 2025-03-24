package com.example.daon.receipts.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.stream.Stream;

@Getter
@RequiredArgsConstructor
public enum ReceiptCategory {
    EX("전체"),//전체
    SALES("매출"),              // 매출
    SALES_DISCOUNT("매출할인"),     // 매출할인
    PURCHASE("매입"),           // 매입
    PURCHASE_DISCOUNT("매입할인"), // 매입할인
    DEPOSIT("입금"),            // 입금 (수금)
    WITHDRAWAL("출금"),         // 출금 (지급)
    MAINTENANCE_FEE("관리비"),    // 관리비
    OPERATING_PROFIT("경상손익"),   // 경상손익
    SALES_ALTERNATIVE("매출대체"),  // 매출대체
    RETURN_OUT("반품출고"),         // 반품출고
    RETURN_IN("반품입고");  // 반품입고


    private final String cate;

    //user_role 유효성 검사
    @JsonCreator
    public static ReceiptCategory positionParsing(String inputValue) {

        return Stream.of(ReceiptCategory.values())
                .filter(receiptCategory -> receiptCategory.toString().equals(inputValue))
                .findFirst()
                .orElse(EX);
    }
}
