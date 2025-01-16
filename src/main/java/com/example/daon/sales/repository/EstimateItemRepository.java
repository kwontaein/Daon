package com.example.daon.sales.repository;

import com.example.daon.sales.model.EstimateItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface EstimateItemRepository extends JpaRepository<EstimateItem, UUID>, JpaSpecificationExecutor<EstimateItem> {
}
