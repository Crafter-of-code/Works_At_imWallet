package com.app.backend.jdbc;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
@Component
public class DatabaseConnection {
    private final String url;
    private final String userName;
    private final String password;
    public DatabaseConnection(
            @Value("${database.url}") String url,
            @Value("${database.username}") String username,
            @Value("${database.password}") String password
    ) {
        this.url = url;
        this.userName = username;
        this.password = password;
    }

    public Connection connection() throws SQLException {
        return DriverManager.getConnection(url,userName,password);
    }
}
