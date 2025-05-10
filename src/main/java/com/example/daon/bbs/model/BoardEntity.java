package com.example.daon.bbs.model;

import com.example.daon.bbs.dto.request.BoardRequest;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDate;
import java.util.UUID;

@Entity(name = "board")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardEntity {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "board_id", columnDefinition = "BINARY(16)")
    private UUID boardId;
    //작성일
    @Column(nullable = false, name = "create_at")
    private LocalDate createAt;
    //작성자
    @Column(nullable = false, name = "writer")
    private String writer;
    //제목
    @Column(nullable = false, name = "title")
    private String title;
    //내용
    @Column(nullable = false, name = "content")
    private String content;

    @Column(name = "notice")
    private boolean notice;

    public void updateFromRequest(BoardRequest boardRequest) {
        this.title = boardRequest.getTitle();
        this.content = boardRequest.getContent();
        this.notice = boardRequest.isNotice();
    }
}
