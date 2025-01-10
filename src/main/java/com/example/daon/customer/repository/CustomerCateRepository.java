package com.example.daon.customer.repository;

import com.example.daon.customer.model.CustomerCateEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface CustomerCateRepository extends JpaRepository<CustomerCateEntity, UUID>, JpaSpecificationExecutor<CustomerCateEntity> {
}
