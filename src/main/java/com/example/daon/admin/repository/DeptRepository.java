package com.example.daon.admin.repository;

import com.example.daon.admin.model.DeptEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DeptRepository extends JpaRepository<DeptEntity, UUID> {
}
