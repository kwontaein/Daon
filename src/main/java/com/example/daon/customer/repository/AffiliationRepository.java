package com.example.daon.customer.repository;

import com.example.daon.customer.model.AffiliationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface AffiliationRepository extends JpaRepository<AffiliationEntity, UUID>, JpaSpecificationExecutor<AffiliationEntity> {
}
