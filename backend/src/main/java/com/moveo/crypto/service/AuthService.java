package com.moveo.crypto.service;

import com.moveo.crypto.dto.AuthDtos;

public interface AuthService {
    AuthDtos.AuthResponse signup(AuthDtos.SignupRequest req);
    AuthDtos.AuthResponse login(AuthDtos.LoginRequest req);
}
