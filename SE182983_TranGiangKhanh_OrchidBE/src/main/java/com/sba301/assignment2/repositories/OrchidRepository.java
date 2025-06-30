package com.sba301.assignment2.repositories;

import com.sba301.assignment2.models.Category;
import com.sba301.assignment2.models.Orchid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrchidRepository extends JpaRepository<Orchid, Long> {
    List<Orchid> findByOrchidNameContainingIgnoreCase(String keyword);
}
