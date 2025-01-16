package com.example.daon.schedule.controller;

import com.example.daon.schedule.dto.request.ScheduleRequest;
import com.example.daon.schedule.model.ScheduleEntity;
import com.example.daon.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 일정관리
 */
@RestController
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    //일정불러오기
    @GetMapping("api/ReadSchedule")
    public List<ScheduleEntity> ReadSchedule() {
        return scheduleService.ReadSchedule();
    }

    //일정등록
    @PostMapping("api/SaveSchedule")
    public void SaveSchedule(@RequestBody ScheduleRequest scheduleRequest) {
        scheduleService.SaveSchedule(scheduleRequest);
    }

    //일정삭제
    @PostMapping("api/DeleteSchedule")
    public void DeleteSchedule(@RequestBody ScheduleRequest scheduleRequest) {
        scheduleService.DeleteSchedule(scheduleRequest.getScheduleId());
    }
}
