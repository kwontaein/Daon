package com.example.daon.stock.repository;

import com.example.daon.stock.model.StockCate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface StockCateRepository extends JpaRepository<StockCate, UUID>, JpaSpecificationExecutor<StockCate> {
    Optional<StockCate> findByStockCateName(@Param("name") String name);

}
