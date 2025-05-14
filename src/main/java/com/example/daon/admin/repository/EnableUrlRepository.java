package com.example.daon.admin.repository;

import com.example.daon.admin.model.EnableUrl;
import com.example.daon.admin.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface EnableUrlRepository extends JpaRepository<EnableUrl, UUID>, JpaSpecificationExecutor<EnableUrl> {
    Optional<EnableUrl> findByUser(@Param("user") UserEntity user);
}
