package com.example.daon.bbs.service;

import com.example.daon.bbs.dto.request.BoardRequest;
import com.example.daon.bbs.dto.request.FileRequest;
import com.example.daon.bbs.dto.response.BoardResponse;
import com.example.daon.bbs.dto.response.FileResponse;
import com.example.daon.bbs.model.BoardEntity;
import com.example.daon.bbs.model.FileEntity;
import com.example.daon.bbs.repository.BoardRepository;
import com.example.daon.bbs.repository.FileRepository;
import com.example.daon.global.service.GlobalService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    private final FileRepository fileRepository;
    private final GlobalService globalService;
    private final String uploadDir = "uploads/"; // 실제 저장 경로

    public List<BoardResponse> getBoard() {
        List<BoardEntity> boardEntities = boardRepository.findAll();

        return boardEntities.stream().map(board -> {
            BoardResponse boardResponse = globalService.convertToBoardResponse(board);
            List<FileResponse> fileResponses = board.getFiles().stream()
                    .map(globalService::convertToFileResponse)
                    .collect(Collectors.toList());
            boardResponse.setFiles(fileResponses);
            return boardResponse;
        }).collect(Collectors.toList());
    }


    @Transactional
    public void saveBoard(BoardRequest boardRequest) throws IOException {

        // 1. 게시글 저장
        BoardEntity boardEntity = boardRepository.save(boardRequest.toEntity());

        // 2. 첨부파일 저장
        List<MultipartFile> files = boardRequest.getFiles();

        for (MultipartFile file : files) {
            saveOneFile(file, boardEntity);  // 별도 메서드로 트랜잭션 묶기
        }
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void saveOneFile(MultipartFile file, BoardEntity boardEntity) throws IOException {
        String uuid = UUID.randomUUID().toString();
        String originalName = file.getOriginalFilename();
        String fileName = uuid + "_" + originalName;
        Path path = Paths.get(uploadDir + fileName);

        Files.createDirectories(path.getParent());
        Files.write(path, file.getBytes());

        // 3. 파일 DB 정보 저장
        FileEntity fileEntity = new FileEntity();
        fileEntity.setFileId(UUID.randomUUID()); // 이걸 직접 넣어도 안된다는 거지?
        fileEntity.setFileName(fileName);
        fileEntity.setOriginalName(originalName);
        fileEntity.setFilePath(path.toString());
        fileEntity.setFileSize(file.getSize()); // 👈 파일 크기 저장
        fileEntity.setDownload(0); // 👈 파일 크기 저장
        fileEntity.setBoardId(boardEntity); // 관계 설정

        fileRepository.save(fileEntity);
        fileRepository.flush(); // 즉시 DB insert 실행
    }


    @Transactional
    public void updateBoard(BoardRequest boardRequest) throws IOException {
    /*    UUID boardId = boardRequest.getBoardId();

        // 1. 게시글 가져오기
        BoardEntity boardEntity = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없음"));

        // 2. 게시글 본문 수정
        boardEntity.updateFromRequest(boardRequest);

        // 3. 파일 처리
        List<FileEntity> savedFiles = fileRepository.findByBoardId(boardEntity);
        List<UUID> requestFileIds = boardRequest.getExistingFileIds(); // 유지할 파일 ID들

        // 삭제 대상 찾기
        List<FileEntity> toDelete = savedFiles.stream()
                .filter(file -> !requestFileIds.contains(file.getFileId()))
                .collect(Collectors.toList());

        for (FileEntity file : toDelete) {
            // 실제 파일 삭제
            Path path = Paths.get(file.getFilePath());
            Files.deleteIfExists(path);

            fileRepository.delete(file); // DB 삭제
        }

        // 새 파일 저장
        List<MultipartFile> newFiles = boardRequest.getNewFiles();
        for (MultipartFile file : newFiles) {
            String uuid = UUID.randomUUID().toString();
            String originalName = file.getOriginalFilename();
            String fileName = uuid + "_" + originalName;
            Path path = Paths.get(uploadDir + fileName);

            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            FileEntity fileEntity = new FileEntity();
            fileEntity.setFileName(fileName);
            fileEntity.setOriginalName(originalName);
            fileEntity.setFilePath(path.toString());
            fileEntity.setBoardId(boardEntity);

            fileRepository.save(fileEntity);
        }

        // 4. 서브테이블 정보 업데이트 (예: 태그, 댓글, etc.)
        // TODO: 필요시 여기에 구현

        // 5. 게시글 저장 (JPA 영속성 컨텍스트로 생략 가능)
        boardRepository.save(boardEntity);*/
    }


    @Transactional
    public void deleteBoard(BoardRequest boardRequest) {
        UUID boardId = boardRequest.getBoardId();

        BoardEntity boardEntity = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없음"));

        // 1. 파일 정보 조회
        List<FileEntity> files = fileRepository.findByBoardId(boardEntity);

        // 2. 실제 파일 삭제
        for (FileEntity file : files) {
            Path path = Paths.get(file.getFilePath());
            try {
                Files.deleteIfExists(path);
            } catch (IOException e) {
                throw new RuntimeException("파일 삭제 실패: " + file.getFilePath(), e);
            }
        }

        // 3. 파일 DB 삭제
        fileRepository.deleteAll(files);

        // 5. 게시글 삭제
        boardRepository.deleteById(boardId);
    }


    public void updateViews(BoardRequest boardRequest) {
        BoardEntity boardEntity = boardRepository.findById(boardRequest.getBoardId()).orElse(null);
        boardEntity.setViews(boardEntity.getViews() + 1);
        boardRepository.save(boardEntity);

    }


    public void updateDownload(FileRequest fileRequest) {
        FileEntity file = fileRepository.findById(fileRequest.getFileId()).orElse(null);
        file.setDownload(file.getDownload() + 1);

        fileRepository.save(file);
    }
}
