package com.sba301.assignment2.controllers;

import com.sba301.assignment2.dtos.responses.OrchidResponse;
import com.sba301.assignment2.models.Orchid;
import com.sba301.assignment2.services.OrchidService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orchids")
@RequiredArgsConstructor
public class OrchidController {

    private final OrchidService orchidService;

    @GetMapping
    public List<OrchidResponse> getAll(@RequestParam(value = "search", required = false) String keyword) {
        return orchidService.getAllOrchids(keyword);
    }

    @GetMapping("/{id}")
    public OrchidResponse getById(@PathVariable Long id) {
        return orchidService.getOrchidById(id);
    }

    @PostMapping
    public OrchidResponse create(@RequestBody Orchid orchid) {
        return orchidService.createOrchid(orchid);
    }

    @PutMapping("/{id}")
    public OrchidResponse update(@PathVariable Long id, @RequestBody Orchid orchid) {
        return orchidService.updateOrchid(id, orchid);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        orchidService.deleteOrchid(id);
        return ResponseEntity.noContent().build();
    }
}
