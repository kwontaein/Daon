package com.example.daon.calendar.dto.response;

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
public class CalendarResponse {
    private UUID calendarId;
    private LocalDate regDate;
    private String memo;
    private String userId;
    private String userName;
}
