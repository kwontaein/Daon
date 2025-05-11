package com.example.daon.bbs.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileRequest {
    private String fileLink;
    private String fileName;
    private UUID fileId;
    private UUID boardId;
}
