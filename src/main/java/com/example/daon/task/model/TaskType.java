package com.example.daon.task.model;

import com.example.daon.sales.model.ReceiptCategory;
import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.stream.Stream;

@Getter
@RequiredArgsConstructor
public enum TaskType {
    AS("A/S"),              // A/S
    INCOMING("입고"),        // 입고
    DELIVERY("납품"),        // 납품
    INVENTORY("재고"),       // 재고
    OTHER("기타"),           // 기타
    RENTAL("임대"),          // 임대
    MAINTENANCE("유지보수"),     // 유지보수
    ATTENDANCE("근태");    // 근태


    private final String type;

    //user_role 유효성 검사
    @JsonCreator
    public static TaskType positionParsing(String inputValue) {

        return Stream.of(TaskType.values())
                .filter(taskType -> taskType.toString().equals(inputValue))
                .findFirst()
                .orElse(AS);
    }
}
