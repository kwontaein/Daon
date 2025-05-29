package com.example.daon.accounting.salesVAT.repository;

import com.example.daon.accounting.salesVAT.model.SalesVATEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface SalesVATRepository extends JpaRepository<SalesVATEntity, UUID>, JpaSpecificationExecutor<SalesVATEntity> {
    Optional<SalesVATEntity> findByReceiptId(@Param("receiptId") UUID receiptId);
}
