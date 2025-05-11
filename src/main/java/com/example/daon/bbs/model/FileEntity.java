package com.example.daon.bbs.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity(name = "file")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileEntity {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "file_id", columnDefinition = "BINARY(16)")
    private UUID fileId;
    
    @ManyToOne
    @JoinColumn(nullable = false, unique = true, name = "board_id", columnDefinition = "BINARY(16)")
    private BoardEntity boardId;

    @Column(name = "original_name")
    private String originalName; // 원본 이름

    @Column(name = "file_path")
    private String filePath;     // 저장 경로 (혹은 URL)

    @Column(name = "file_name")
    private String fileName; //저장 파일 이름
}
