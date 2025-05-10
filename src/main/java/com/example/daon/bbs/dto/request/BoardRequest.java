package com.example.daon.bbs.dto.request;

import com.example.daon.bbs.model.BoardEntity;
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
public class BoardRequest {

    private UUID boardId;
    private LocalDate createAt;
    private String writer;
    private String title;
    private String content;
    private boolean notice;
    private int views;

    public BoardEntity toEntity() {
        return BoardEntity
                .builder()
                .notice(notice)
                .content(content)
                .title(title)
                .writer(writer)
                .views(0)
                .build();
    }

}
