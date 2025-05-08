package com.example.daon.calendar.dto.request;

import com.example.daon.admin.model.UserEntity;
import com.example.daon.calendar.model.CalendarEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CalendarRequest {
    private UUID calendarId;
    private LocalDate date;
    private String memo;
    private String userId;
    private int month; // 어느 달 정보 가져올건지
    private int year; // 어느 달 정보 가져올건지

    public CalendarEntity toEntity(UserEntity user) {
        return CalendarEntity
                .builder()
                .date(date)
                .memo(memo)
                .user(user)
                .build();
    }
}
