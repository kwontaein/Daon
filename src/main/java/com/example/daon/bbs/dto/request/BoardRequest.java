package com.example.daon.bbs.dto.request;

import com.example.daon.bbs.model.BoardEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
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
    private List<MultipartFile> files;      // 기존 저장 항목
    //----------------------업데이트 시 필요항목
    /*private List<UUID> existingFileIds;     // 유지할 파일 ID 목록
    private List<MultipartFile> newFiles;   // 새로 업로드된 파일들*/

    public BoardEntity toEntity() {
        return BoardEntity
                .builder()
                .notice(notice)
                .content(content)
                .title(title)
                .writer(writer)
                .createAt(LocalDate.now())
                .views(0)
                .build();
    }

}
