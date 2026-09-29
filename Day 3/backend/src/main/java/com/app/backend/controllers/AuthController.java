package com.app.backend.controllers;

import com.app.backend.dto.GeneralResponse;
import com.app.backend.dto.auth.LoginRequestDto;
import com.app.backend.dto.auth.SigninRequestDto;
import com.app.backend.dto.auth.TokenResponseDto;
import com.app.backend.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    private final AuthService authService;

    AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signin")
    public ResponseEntity<GeneralResponse<Void>> createAccount(
            @RequestBody SigninRequestDto userData
    ) {

        GeneralResponse<Void> response =
                authService.createAccountService(userData);

        if (response.isStatus()) {
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(response);
        }

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<GeneralResponse<TokenResponseDto>> login(
            @RequestBody LoginRequestDto userLoginData
    ) {

        GeneralResponse<TokenResponseDto> response =
                authService.loginUserService(userLoginData);

        if (response.isStatus()) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(response);
        }

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(response);
    }
}