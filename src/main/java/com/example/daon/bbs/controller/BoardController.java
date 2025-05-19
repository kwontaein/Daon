package com.example.daon.bbs.controller;

import com.example.daon.bbs.dto.request.BoardRequest;
import com.example.daon.bbs.dto.request.FileRequest;
import com.example.daon.bbs.dto.response.BoardResponse;
import com.example.daon.bbs.service.BoardService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

/**
 * 사내게시판
 */
@RestController
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;

    @GetMapping("api/getBoard")
    public List<BoardResponse> getBoard() {
        return boardService.getBoard();
    }

    @PostMapping("api/saveBoard")

    public void saveBoard(
            @RequestPart("board") String boardJson,
            @RequestPart(value = "files", required = false) List<MultipartFile> files
    ) {

        try {
            ObjectMapper mapper = new ObjectMapper();
            BoardRequest boardRequest = mapper.readValue(boardJson, BoardRequest.class);


            // ✅ files가 null이 아닐 때만 넣어줌
            if (files != null && !files.isEmpty()) {
                boardRequest.setFiles(files);
            }

            boardService.saveBoard(boardRequest);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("게시글 저장 중 오류 발생", e);
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

    @PostMapping("api/updateDownload")
    public void updateDownload(@ModelAttribute FileRequest fileRequest) {
        boardService.updateDownload(fileRequest);
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
