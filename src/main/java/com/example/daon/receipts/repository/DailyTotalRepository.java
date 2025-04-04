package com.example.daon.receipts.repository;

import com.example.daon.receipts.model.DailyTotalEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

public interface DailyTotalRepository extends JpaRepository<DailyTotalEntity, UUID>, JpaSpecificationExecutor<DailyTotalEntity> {
    Optional<DailyTotalEntity> findDailyTotalEntityByDate(@Param("date") LocalDate date);
}
