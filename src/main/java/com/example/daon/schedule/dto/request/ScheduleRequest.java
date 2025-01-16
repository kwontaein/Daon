package com.example.daon.schedule.dto.request;

import com.example.daon.admin.model.UserEntity;
import com.example.daon.schedule.model.ScheduleEntity;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
public class ScheduleRequest {
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
