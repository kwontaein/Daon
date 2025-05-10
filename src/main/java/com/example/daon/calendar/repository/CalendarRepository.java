package com.example.daon.calendar.repository;

import com.example.daon.calendar.model.CalendarEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CalendarRepository extends JpaRepository<CalendarEntity, UUID>, JpaSpecificationExecutor<CalendarEntity> {
}
