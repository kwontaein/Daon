package com.example.daon.bbs.repository;

import com.example.daon.bbs.model.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, UUID>, JpaSpecificationExecutor<BoardEntity> {
}
