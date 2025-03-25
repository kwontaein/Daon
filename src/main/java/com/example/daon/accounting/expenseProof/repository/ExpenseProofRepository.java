package com.example.daon.accounting.expenseProof.repository;

import com.example.daon.accounting.expenseProof.model.ExpenseProofEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface ExpenseProofRepository extends JpaRepository<ExpenseProofEntity, UUID>, JpaSpecificationExecutor<ExpenseProofEntity> {
}
