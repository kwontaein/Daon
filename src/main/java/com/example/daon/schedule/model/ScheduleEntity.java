package com.example.daon.schedule.model;

import com.example.daon.admin.model.UserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "schedule")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleEntity {

    //아이디
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "schedule_id", columnDefinition = "BINARY(16)")
    private UUID scheduleId;
    //날짜
    @Column(name = "date")
    private LocalDate date;
    //등록일
    @Column(name = "reg_date")
    private LocalDate regDate;
    //내용
    @Column(name = "content")
    private LocalDate content;
    //유저
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
