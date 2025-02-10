package com.example.daon.receipts.repository;

import com.example.daon.receipts.model.ReceiptEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface ReceiptRepository extends JpaRepository<ReceiptEntity, UUID>, JpaSpecificationExecutor<ReceiptEntity> {
}
