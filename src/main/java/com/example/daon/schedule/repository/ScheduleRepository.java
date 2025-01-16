package com.example.daon.schedule.repository;

import com.example.daon.admin.model.UserEntity;
import com.example.daon.customer.model.CustomerCateEntity;
import com.example.daon.schedule.model.ScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ScheduleRepository extends JpaRepository<ScheduleEntity, UUID>, JpaSpecificationExecutor<ScheduleEntity> {
    Optional<List<ScheduleEntity>> findByUser(UserEntity user);
}
