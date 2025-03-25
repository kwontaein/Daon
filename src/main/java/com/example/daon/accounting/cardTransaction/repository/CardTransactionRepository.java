package com.example.daon.accounting.cardTransaction.repository;

import com.example.daon.accounting.cardTransaction.model.CardTransactionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CardTransactionRepository extends JpaRepository<CardTransactionEntity, UUID>, JpaSpecificationExecutor<CardTransactionEntity> {
}
