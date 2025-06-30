package com.sba301.assignment2.services.impl;

import com.sba301.assignment2.dtos.responses.OrchidResponse;
import com.sba301.assignment2.models.Category;
import com.sba301.assignment2.models.Orchid;
import com.sba301.assignment2.repositories.CategoryRepository;
import com.sba301.assignment2.repositories.OrchidRepository;
import com.sba301.assignment2.services.OrchidService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrchidServiceImpl implements OrchidService {

    private final OrchidRepository orchidRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public List<OrchidResponse> getAllOrchids(String keyword) {
        List<Orchid> orchids =  (keyword != null && !keyword.isEmpty())
                ? orchidRepository.findByOrchidNameContainingIgnoreCase(keyword)
                : orchidRepository.findAll();

        return orchids
                .stream()
                .map(OrchidResponse::of)
                .collect(Collectors.toList());
    }

    @Override
    public OrchidResponse getOrchidById(Long id) {
        Orchid orchid = orchidRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orchid not found"));
        return OrchidResponse.of(orchid);
    }

    @Override
    public OrchidResponse createOrchid(Orchid orchid) {
        // Ensure category exists
        Category category = categoryRepository.findById(orchid.getCategory().getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        orchid.setCategory(category);
        return OrchidResponse.of(orchidRepository.save(orchid));
    }

    @Override
    public OrchidResponse updateOrchid(Long id, Orchid orchid) {
        Orchid existing = orchidRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orchid not found"));

        existing.setIsNatural(orchid.getIsNatural());
        existing.setOrchidDescription(orchid.getOrchidDescription());
        existing.setOrchidName(orchid.getOrchidName());
        existing.setOrchidUrl(orchid.getOrchidUrl());
        existing.setPrice(orchid.getPrice());

        // Update category
        Category category = categoryRepository.findById(orchid.getCategory().getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        existing.setCategory(category);

        return OrchidResponse.of(orchidRepository.save(existing));
    }

    @Override
    public void deleteOrchid(Long id) {
        orchidRepository.deleteById(id);
    }
}
