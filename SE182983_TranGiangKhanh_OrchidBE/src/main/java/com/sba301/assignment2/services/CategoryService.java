package com.sba301.assignment2.services;

import com.sba301.assignment2.dtos.responses.CategoryResponse;
import com.sba301.assignment2.models.Category;

import java.util.List;

public interface CategoryService {
    List<CategoryResponse> getAll(String keyword);
    CategoryResponse getById(Long id);
    CategoryResponse create(Category category);
    CategoryResponse update(Long id, Category category);
    void delete(Long id);
}
