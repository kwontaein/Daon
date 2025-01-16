package com.example.daon.sales.repository;

import com.example.daon.sales.model.EstimateEntity;
import com.example.daon.sales.model.ReceiptEntity;
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
