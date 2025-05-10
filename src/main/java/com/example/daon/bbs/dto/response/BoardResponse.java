package com.example.daon.bbs.dto.response;

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
public class BoardResponse {

    private UUID boardId;
    private LocalDate createAt;
    private String writer;
    private String title;
    private String content;
    private boolean notice;

}
