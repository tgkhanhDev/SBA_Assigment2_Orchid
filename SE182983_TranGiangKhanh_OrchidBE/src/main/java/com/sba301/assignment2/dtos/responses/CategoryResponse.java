package com.sba301.assignment2.dtos.responses;

import com.sba301.assignment2.models.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryResponse {
    private Long categoryID;
    private String categoryName;

    public static CategoryResponse of(Category category) {
        return CategoryResponse.builder()
                .categoryID(category.getCategoryId())
                .categoryName(category.getCategoryName())
                .build();
    }
}