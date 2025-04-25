package com.example.daon.calendar.repository;

import com.example.daon.calendar.model.CalendarEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface CalendarRepository extends JpaRepository<CalendarEntity, UUID>, JpaSpecificationExecutor<CalendarEntity> {
}
