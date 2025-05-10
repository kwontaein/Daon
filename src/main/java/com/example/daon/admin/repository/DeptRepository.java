package com.example.daon.admin.repository;

import com.example.daon.admin.model.DeptEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DeptRepository extends JpaRepository<DeptEntity, UUID> {
}
