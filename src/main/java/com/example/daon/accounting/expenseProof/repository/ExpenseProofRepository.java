package com.example.daon.accounting.expenseProof.repository;

import com.example.daon.accounting.expenseProof.model.ExpenseProofEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ExpenseProofRepository extends JpaRepository<ExpenseProofEntity, UUID>, JpaSpecificationExecutor<ExpenseProofEntity> {
    Optional<ExpenseProofEntity> findByReceiptId(@Param("receiptId") UUID receiptId);
}
