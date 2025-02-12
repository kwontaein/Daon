package com.example.daon.stock.repository;

import com.example.daon.stock.model.StockCate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface StockCateRepository extends JpaRepository<StockCate, UUID>, JpaSpecificationExecutor<StockCate> {
    Optional<StockCate> findByStockCateName(@Param("name") String name);

}
