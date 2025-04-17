package com.example.daon.accounting.categorySelection.service;

import com.example.daon.accounting.categorySelection.model.CategorySelectionEntity;
import com.example.daon.accounting.categorySelection.repository.CategorySelectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategorySelectionService {
    private final CategorySelectionRepository categorySelectionRepository;

    public List<CategorySelectionEntity> getCategorySelection() {
        return categorySelectionRepository.findAll();
    }

    public void findAndSave(String newName) {
        CategorySelectionEntity categorySelection = categorySelectionRepository.findById(newName).orElse(null);
        if (categorySelection == null) {
            saveCategorySelection(newName);
        }
    }

    public void saveCategorySelection(String newName) {
        categorySelectionRepository.save(new CategorySelectionEntity(newName));
    }
}
