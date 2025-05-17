package com.example.daon.bbs.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity(name = "file")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileEntity {
    @Id
    @Column(name = "file_id", columnDefinition = "BINARY(16)", updatable = false, nullable = false)
    private UUID fileId;

    @ManyToOne
    @JoinColumn(name = "board_id")
    private BoardEntity boardId;

    @Column(name = "original_name")
    private String originalName; // 원본 이름

    @Column(name = "file_path")
    private String filePath;     // 저장 경로 (혹은 URL)

    @Column(name = "file_name")
    private String fileName; //저장 파일 이름
}
