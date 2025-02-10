package com.example.daon.estimate.repository;

import com.example.daon.estimate.model.EstimateItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface EstimateItemRepository extends JpaRepository<EstimateItem, UUID>, JpaSpecificationExecutor<EstimateItem> {
}
