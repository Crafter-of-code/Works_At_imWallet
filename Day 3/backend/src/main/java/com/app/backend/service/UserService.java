package com.app.backend.service;

import com.app.backend.jdbc.model.HomeDataModel;
import com.app.backend.jdbc.model.UserModel;
import com.app.backend.jdbc.model.UserSearchModel;
import com.app.backend.jdbc.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(
            UserRepository userRepository
    ) {
        this.userRepository = userRepository;
    }


    public HomeDataModel getHomeData(
            String userEmail
    ) {

        HomeDataModel homeData =
                userRepository.getHomeData(
                        userEmail
                );

        if (homeData == null) {

            throw new RuntimeException(
                    "User not found"
            );
        }

        return homeData;
    }


    public List<UserSearchModel> searchUsers(
            String query,
            String currentUserEmail
    ) {
        return userRepository.searchUsers(
                query,
                currentUserEmail
        );
    }
}