package com.example.daon.bbs.repository;

import com.example.daon.bbs.model.BoardEntity;
import com.example.daon.bbs.model.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FileRepository extends JpaRepository<FileEntity, UUID>, JpaSpecificationExecutor<FileEntity> {
    List<FileEntity> findByBoardId(@Param("boardId") BoardEntity board);
}
