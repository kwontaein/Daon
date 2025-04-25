package com.example.daon.bbs.controller;

import com.example.daon.bbs.dto.response.BoardResponse;
import com.example.daon.bbs.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 사내게시판
 */
@RestController
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;

    @PostMapping("api/getBoard")
    public List<BoardResponse> getBoard() {
        return boardService.getBoard();
    }
}
