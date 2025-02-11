package com.example.daon.admin.repository;

import com.example.daon.admin.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, String> {
    Optional<UserEntity> findById(String id);

    void save(UserEntity entity, PasswordEncoder passwordEncoder);
}
