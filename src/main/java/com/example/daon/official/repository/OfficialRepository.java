package com.example.daon.official.repository;

import com.example.daon.official.model.OfficialEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface OfficialRepository extends JpaRepository<OfficialEntity, UUID>, JpaSpecificationExecutor<OfficialEntity> {
}
