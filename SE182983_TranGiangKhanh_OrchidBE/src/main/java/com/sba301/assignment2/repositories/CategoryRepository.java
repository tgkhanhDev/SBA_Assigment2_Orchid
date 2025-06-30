package com.sba301.assignment2.repositories;

import com.sba301.assignment2.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByCategoryNameContainingIgnoreCase(String keyword);
}
