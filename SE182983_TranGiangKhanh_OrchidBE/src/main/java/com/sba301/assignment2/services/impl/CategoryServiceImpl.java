package com.sba301.assignment2.services.impl;

import com.sba301.assignment2.dtos.responses.CategoryResponse;
import com.sba301.assignment2.models.Category;
import com.sba301.assignment2.repositories.CategoryRepository;
import com.sba301.assignment2.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public List<CategoryResponse> getAll(String keyword) {
        List<Category> categories = (keyword != null && !keyword.isEmpty())
                ? categoryRepository.findByCategoryNameContainingIgnoreCase(keyword)
                : categoryRepository.findAll();

        return categories.stream()
                .map(cat -> new CategoryResponse(cat.getCategoryId(), cat.getCategoryName()))
                .collect(Collectors.toList());
    }

    @Override
    public CategoryResponse getById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        return new CategoryResponse(category.getCategoryId(), category.getCategoryName());
    }

    @Override
    public CategoryResponse create(Category category) {
        Category saved = categoryRepository.save(category);
        return new CategoryResponse(saved.getCategoryId(), saved.getCategoryName());
    }

    @Override
    public CategoryResponse update(Long id, Category category) {
        Category existing = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        existing.setCategoryName(category.getCategoryName());
        Category updated = categoryRepository.save(existing);
        return new CategoryResponse(updated.getCategoryId(), updated.getCategoryName());
    }

    @Override
    public void delete(Long id) {
        categoryRepository.deleteById(id);
    }
}
