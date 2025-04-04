package com.example.daon.ledger.dto.request;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.stream.Stream;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoPaidRequest {
    private UUID customerId;

    //상호명
    private String customerName;

    //검색 시작일
    private LocalDateTime searchSDate;

    //종료일
    private LocalDateTime searchEDate;

    //포함조건
    private searchCondition condition;

    @Getter
    @RequiredArgsConstructor
    public enum searchCondition { //enum을 활용한 권한종류 설정
        ALL("전체"),
        UNPAID("미수금"),
        PAYABLE("미지급");

        private final String role;

        //user_role 유효성 검사
        @JsonCreator
        public static searchCondition userRoleParsing(String inputValue) {

            return Stream.of(searchCondition.values())
                    .filter(searchCondition -> searchCondition.toString().equals(inputValue))
                    .findFirst()
                    .orElse(ALL);
        }

    }
}
