package com.example.daon.schedule.dto.response;

import com.example.daon.admin.model.UserEntity;
import com.example.daon.schedule.model.ScheduleEntity;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
public class ScheduleResponse {
    public UUID scheduleId;
    //날짜
    public LocalDate date;
    //등록일
    public LocalDate regDate;
    //내용
    public LocalDate content;

    public ScheduleEntity toEntity(UserEntity user) {
        return ScheduleEntity
                .builder()
                .scheduleId(scheduleId)
                .date(date)
                .regDate(regDate)
                .content(content)
                .user(user)
                .build();
    }
}
