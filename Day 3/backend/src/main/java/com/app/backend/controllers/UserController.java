package com.app.backend.controllers;

import com.app.backend.dto.GeneralResponse;
import com.app.backend.jdbc.model.HomeDataModel;
import com.app.backend.jdbc.model.UserModel;

import com.app.backend.jdbc.model.UserSearchModel;
import com.app.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    private final com.app.backend.service.UserService userService;

    public UserController(
            UserService userService
    ) {
        this.userService = userService;
    }

    @GetMapping("/home")
    public ResponseEntity<GeneralResponse<HomeDataModel>>
    getHomeData(
            Authentication authentication
    ) {

        String userEmail =
                authentication.getName();

        HomeDataModel homeData =
                userService.getHomeData(
                        userEmail
                );

        GeneralResponse<HomeDataModel> response =
                new GeneralResponse<>(
                        true,
                        "Home data fetched successfully",
                        homeData
                );

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }


    @GetMapping("/users/search")
    public ResponseEntity<GeneralResponse<List<UserSearchModel>>> searchUsers(
            @RequestParam String query,
            Authentication authentication
    ) {
        String currentUserEmail = authentication.getName();

        List<UserSearchModel> users =
                userService.searchUsers(query, currentUserEmail);

        return ResponseEntity.ok(
                new GeneralResponse<>(
                        true,
                        "Users fetched successfully",
                        users
                )
        );
    }
}