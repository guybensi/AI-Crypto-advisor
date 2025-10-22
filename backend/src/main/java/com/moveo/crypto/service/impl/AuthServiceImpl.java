package com.moveo.crypto.service.impl;

import com.moveo.crypto.domain.User;
import com.moveo.crypto.dto.AuthDtos;
import com.moveo.crypto.repository.UserRepository;
import com.moveo.crypto.security.JwtUtil;
import com.moveo.crypto.service.AuthService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * AuthServiceImpl
 * Handles user signup/login with JWT issuance.
 * NOTE: For production, add email verification, rate-limits, and full JWT filter.
 */
@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepo;
    private final String jwtSecret;
    private final long jwtExpMillis;

    public AuthServiceImpl(UserRepository userRepo,
                           @Value("${app.jwt.secret}") String jwtSecret,
                           @Value("${app.jwt.expirationMillis}") long jwtExpMillis) {
        this.userRepo = userRepo;
        this.jwtSecret = jwtSecret;
        this.jwtExpMillis = jwtExpMillis;
    }

    @Override
    public AuthDtos.AuthResponse signup(AuthDtos.SignupRequest req) {
        Optional<User> existing = userRepo.findByEmail(req.email);
        if (existing.isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }
        User u = new User();
        u.setName(req.name);
        u.setEmail(req.email);
        u.setPasswordHash(BCrypt.hashpw(req.password, BCrypt.gensalt()));
        userRepo.save(u);
        String token = JwtUtil.generateToken(u.getEmail(), jwtSecret, jwtExpMillis);
        return new AuthDtos.AuthResponse(token, u.getName(), u.getEmail());
    }

    @Override
    public AuthDtos.AuthResponse login(AuthDtos.LoginRequest req) {
        User u = userRepo.findByEmail(req.email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));
        if (!BCrypt.checkpw(req.password, u.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid credentials");
        }
        String token = JwtUtil.generateToken(u.getEmail(), jwtSecret, jwtExpMillis);
        return new AuthDtos.AuthResponse(token, u.getName(), u.getEmail());
    }
}
