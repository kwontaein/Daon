package com.example.daon.accounting.salesVAT.repository;

import com.example.daon.accounting.salesVAT.model.SalesVATEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SalesVATRepository extends JpaRepository<SalesVATEntity, UUID>, JpaSpecificationExecutor<SalesVATEntity> {
}
