package com.example.daon.accounting.procurement.repository;

import com.example.daon.accounting.procurement.model.ProcurementEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ProcurementRepository extends JpaRepository<ProcurementEntity, UUID>, JpaSpecificationExecutor<ProcurementEntity> {
}
