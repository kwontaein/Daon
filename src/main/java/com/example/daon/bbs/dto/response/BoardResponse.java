package com.example.daon.bbs.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.UUID;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardResponse {

    private UUID boardId;
    private Timestamp date;
    private String writer;
    private String title;
    private String content;

}
