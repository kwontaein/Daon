package com.example.daon.customer.repository;

import com.example.daon.customer.model.AffiliationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AffiliationRepository extends JpaRepository<AffiliationEntity, UUID>, JpaSpecificationExecutor<AffiliationEntity> {
}
