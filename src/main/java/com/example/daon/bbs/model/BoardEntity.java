package com.example.daon.bbs.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.sql.Timestamp;
import java.util.UUID;

@Entity(name = "board")
public class BoardEntity {
    @Id
    @Column(nullable = false, name = "board_id")
    @GeneratedValue
    private UUID boardId;
    //작성일
    @Column(nullable = false, name = "date")
    private Timestamp date;
    //작성자
    @Column(nullable = false, name = "writer")
    private String writer;
    //제목
    @Column(nullable = false, name = "title")
    private String title;
    //내용
    @Column(nullable = false, name = "content")
    private String content;
    
}
