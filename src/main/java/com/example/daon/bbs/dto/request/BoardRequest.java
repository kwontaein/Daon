package com.example.daon.bbs.dto.request;

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
public class BoardRequest {

    private UUID boardId;
    private Timestamp date;
    private String writer;
    private String title;
    private String content;

}
