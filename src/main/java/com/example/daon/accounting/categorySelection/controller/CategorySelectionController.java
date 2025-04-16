package com.example.daon.accounting.categorySelection.controller;

import com.example.daon.accounting.categorySelection.model.CategorySelectionEntity;
import com.example.daon.accounting.categorySelection.service.CategorySelectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CategorySelectionController {
    private final CategorySelectionService categorySelectionService;

    @GetMapping("api/getCategorySelection")
    public List<CategorySelectionEntity> getCategorySelection() {
        return categorySelectionService.getCategorySelection();
    }
}
