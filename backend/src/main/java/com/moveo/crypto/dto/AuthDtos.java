package com.moveo.crypto.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * DTOs for authentication requests/responses.
 */
public class AuthDtos {
    public static class SignupRequest {
        @NotBlank public String name;
        @NotBlank @Email public String email;
        @NotBlank public String password;
    }
    public static class LoginRequest {
        @NotBlank @Email public String email;
        @NotBlank public String password;
    }
    public static class AuthResponse {
        public String token;
        public String name;
        public String email;
        public AuthResponse(String token, String name, String email) {
            this.token = token; this.name = name; this.email = email;
        }
    }
}
