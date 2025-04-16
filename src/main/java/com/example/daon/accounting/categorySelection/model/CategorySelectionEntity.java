package com.example.daon.accounting.categorySelection.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "category_selection")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategorySelectionEntity {
    @Id
    @Column(name = "category_selection_name")
    private String categorySelection;
}
