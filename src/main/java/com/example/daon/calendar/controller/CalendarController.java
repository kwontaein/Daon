package com.example.daon.calendar.controller;

import com.example.daon.calendar.dto.request.CalendarRequest;
import com.example.daon.calendar.dto.response.CalendarResponse;
import com.example.daon.calendar.service.CalendarService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 내일정관리
 */
@RestController
@RequiredArgsConstructor
public class CalendarController {
    private final CalendarService calendarService;

    @PostMapping("api/getSchedules")
    public List<CalendarResponse> getSchedules(@RequestBody CalendarRequest calendarRequest) {
        return calendarService.getSchedules(calendarRequest);
    }

    @PostMapping("api/saveSchedules")
    public void saveSchedules(@RequestBody CalendarRequest calendarRequest) {
        calendarService.saveSchedules(calendarRequest);
    }

    @PostMapping("api/deleteSchedules")
    public void deleteSchedules(@RequestBody CalendarRequest calendarRequest) {
        calendarService.deleteSchedules(calendarRequest);
    }

    @PostMapping("api/updateSchedule")
    public void updateSchedule(@RequestBody CalendarRequest calendarRequest) {
        calendarService.updateSchedule(calendarRequest);
    }
}
