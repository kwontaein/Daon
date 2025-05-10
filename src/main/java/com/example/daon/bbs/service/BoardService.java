package com.example.daon.bbs.service;

import com.example.daon.bbs.dto.request.BoardRequest;
import com.example.daon.bbs.dto.response.BoardResponse;
import com.example.daon.bbs.model.BoardEntity;
import com.example.daon.bbs.repository.BoardRepository;
import com.example.daon.global.service.GlobalService;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    private final GlobalService globalService;

    public List<BoardResponse> getBoard() {
        List<BoardEntity> boardEntities = boardRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();
            query.orderBy(criteriaBuilder.desc(root.get("createAt")));
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
        return boardEntities.stream().map(globalService::convertToBoardResponse).collect(Collectors.toList());
    }

    public void saveBoard(BoardRequest boardRequest) {
        boardRepository.save(boardRequest.toEntity());
    }

    public void updateBoard(BoardRequest boardRequest) {
        BoardEntity boardEntity = boardRepository.findById(boardRequest.getBoardId()).orElse(null);
        boardEntity.updateFromRequest(boardRequest);
        boardRepository.save(boardEntity);
    }

    public void deleteBoard(BoardRequest boardRequest) {
        boardRepository.deleteById(boardRequest.getBoardId());
    }
}
