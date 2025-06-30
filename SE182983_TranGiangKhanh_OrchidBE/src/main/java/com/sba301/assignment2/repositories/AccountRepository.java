package com.sba301.assignment2.repositories;

import com.sba301.assignment2.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByEmail(String email);

    boolean existsByEmail(String email);
    List<Account> findByEmailContainingIgnoreCase(String email);

}
