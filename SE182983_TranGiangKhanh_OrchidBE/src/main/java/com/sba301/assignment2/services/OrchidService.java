package com.sba301.assignment2.services;

import com.sba301.assignment2.dtos.responses.OrchidResponse;
import com.sba301.assignment2.models.Orchid;

import java.util.List;

public interface OrchidService {
    List<OrchidResponse> getAllOrchids(String keyword);
    OrchidResponse getOrchidById(Long id);
    OrchidResponse createOrchid(Orchid orchid);
    OrchidResponse updateOrchid(Long id, Orchid orchid);
    void deleteOrchid(Long id);
}
