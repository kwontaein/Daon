package com.example.daon.stock.repository;

import com.example.daon.stock.model.StockEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface StockRepository extends JpaRepository<StockEntity, UUID>, JpaSpecificationExecutor<StockEntity> {
    Optional<StockEntity> findByProductName(@Param("productName") String ProductName);
}
