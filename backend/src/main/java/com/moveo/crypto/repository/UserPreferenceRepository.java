package com.moveo.crypto.repository;

import com.moveo.crypto.domain.UserPreference;
import com.moveo.crypto.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserPreferenceRepository extends JpaRepository<UserPreference, Long> {
    Optional<UserPreference> findByUser(User user);
}
