package com.example.daon.bbs.controller;

import com.example.daon.bbs.dto.request.BoardRequest;
import com.example.daon.bbs.dto.response.BoardResponse;
import com.example.daon.bbs.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
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

    @PostMapping("api/saveBoard")
    public void saveBoard(@ModelAttribute BoardRequest boardRequest) {
        try {
            boardService.saveBoard(boardRequest);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("api/updateBoard")
    public void updateBoard(@ModelAttribute BoardRequest boardRequest) {
        try {
            boardService.updateBoard(boardRequest);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("api/deleteBoard")
    public void deleteBoard(@ModelAttribute BoardRequest boardRequest) {
        boardService.deleteBoard(boardRequest);
    }

    @PostMapping("api/updateViews")
    public void updateViews(@ModelAttribute BoardRequest boardRequest) {
        boardService.updateViews(boardRequest);
    }

}
