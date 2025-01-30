package com.example.daon.stock.repository;

import com.example.daon.stock.model.StockEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface StockRepository extends JpaRepository<StockEntity, UUID>, JpaSpecificationExecutor<StockEntity> {
}
