package com.example.daon.accounting.categorySelection.repository;

import com.example.daon.accounting.categorySelection.model.CategorySelectionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface CategorySelectionRepository extends JpaRepository<CategorySelectionEntity, String>, JpaSpecificationExecutor<CategorySelectionEntity> {
}
