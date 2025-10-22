package com.moveo.crypto.repository;

import com.moveo.crypto.domain.DashboardContent;
import com.moveo.crypto.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface DashboardContentRepository extends JpaRepository<DashboardContent, Long> {
    Optional<DashboardContent> findByUserAndDate(User user, LocalDate date);
}
