package com.example.daon.accounting.procurement.repository;

import com.example.daon.accounting.procurement.model.ProcurementSettlementEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface ProcurementRepository extends JpaRepository<ProcurementSettlementEntity, UUID>, JpaSpecificationExecutor<ProcurementSettlementEntity> {
}
