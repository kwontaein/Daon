package com.example.daon.schedule.service;

import com.example.daon.admin.model.UserEntity;
import com.example.daon.global.service.GlobalService;
import com.example.daon.schedule.dto.request.ScheduleRequest;
import com.example.daon.schedule.model.ScheduleEntity;
import com.example.daon.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final GlobalService globalService;

    //목록 읽기
    public List<ScheduleEntity> ReadSchedule() {
        UserEntity user = globalService.getUserEntity(null);
        return scheduleRepository.findByUser(user).orElse(null);
    }

    //일정 저장/수정
    public void SaveSchedule(ScheduleRequest scheduleRequest) {
        UserEntity user = globalService.getUserEntity(null);
        scheduleRepository.save(scheduleRequest.toEntity(user));
    }

    //일정 삭제
    public void DeleteSchedule(UUID scheduleId) {
        scheduleRepository.deleteById(scheduleId);
    }
}
