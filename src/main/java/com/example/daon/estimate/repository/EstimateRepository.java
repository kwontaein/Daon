package com.example.daon.estimate.repository;

import com.example.daon.estimate.model.EstimateEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EstimateRepository extends JpaRepository<EstimateEntity, UUID>, JpaSpecificationExecutor<EstimateEntity> {
    Optional<List<EstimateEntity>> findByReceipted(boolean receipted);
}
