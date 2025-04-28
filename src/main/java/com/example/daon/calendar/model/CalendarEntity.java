package com.example.daon.calendar.model;

import com.example.daon.admin.model.UserEntity;
import com.example.daon.calendar.dto.request.CalendarRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDate;
import java.util.UUID;

@Entity(name = "calendar")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CalendarEntity {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "calendar_id", columnDefinition = "BINARY(16)")
    private UUID calendarId;

    //날짜
    @Column(name = "date")
    private LocalDate date;

    //내용
    @Column(name = "memo")
    private String memo;

    //등록유저
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    public void updateFromRequest(CalendarRequest request) {
        this.date = request.getDate();
        this.memo = request.getMemo();
    }
}
