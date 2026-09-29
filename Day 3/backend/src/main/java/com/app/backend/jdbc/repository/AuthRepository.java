package com.app.backend.jdbc.repository;

import com.app.backend.jdbc.DatabaseConnection;
import com.app.backend.jdbc.model.UserModel;
import org.springframework.stereotype.Repository;

import java.sql.*;

@Repository
public class AuthRepository {

    private final DatabaseConnection databaseConnection;

    AuthRepository(DatabaseConnection databaseConnection) {
        this.databaseConnection = databaseConnection;
    }

    // ---------------------------------------------------------
    // GET USER ID
    // ---------------------------------------------------------

    public Long getUserId(String userEmail) {

        String sql = """
                SELECT user_id
                FROM users
                WHERE user_email = ?
                """;

        try (
                Connection connection = databaseConnection.connection();
                PreparedStatement prst = connection.prepareStatement(sql)
        ) {

            prst.setString(1, userEmail);

            try (ResultSet rslt = prst.executeQuery()) {

                if (rslt.next()) {
                    return rslt.getLong("user_id");
                }
            }

        } catch (SQLException e) {
            throw new RuntimeException("Error getting user ID", e);
        }

        return null;
    }


    // ---------------------------------------------------------
    // CHECK USER EXISTS
    // ---------------------------------------------------------

    public boolean userExists(String userEmail) {

        String sql = """
                SELECT 1
                FROM users
                WHERE user_email = ?
                LIMIT 1
                """;

        try (
                Connection connection = databaseConnection.connection();
                PreparedStatement prst = connection.prepareStatement(sql)
        ) {

            prst.setString(1, userEmail);

            try (ResultSet rslt = prst.executeQuery()) {
                return rslt.next();
            }

        } catch (SQLException e) {
            throw new RuntimeException("Error checking user", e);
        }
    }


    // ---------------------------------------------------------
    // FIND USER BY EMAIL
    // ---------------------------------------------------------

    public UserModel findUserByEmail(String userEmail) {

        String sql = """
                SELECT
                    user_id,
                    user_name,
                    user_email,
                    user_password,
                    user_verified
                FROM users
                WHERE user_email = ?
                """;

        try (
                Connection connection = databaseConnection.connection();
                PreparedStatement prst = connection.prepareStatement(sql)
        ) {

            prst.setString(1, userEmail);

            try (ResultSet rslt = prst.executeQuery()) {

                if (rslt.next()) {

                    UserModel user = new UserModel();

                    user.setUserId(
                            rslt.getLong("user_id")
                    );

                    user.setUserName(
                            rslt.getString("user_name")
                    );

                    user.setUserEmail(
                            rslt.getString("user_email")
                    );

                    user.setUserPassword(
                            rslt.getString("user_password")
                    );

                    user.setUserVerified(
                            rslt.getBoolean("user_verified")
                    );

                    return user;
                }
            }

        } catch (SQLException e) {
            throw new RuntimeException("Error finding user", e);
        }

        return null;
    }


    // ---------------------------------------------------------
    // CREATE USER
    // ---------------------------------------------------------

    public Long createUser(
            String userName,
            String userEmail,
            String userPassword
    ) {

        String sql = """
                INSERT INTO users
                (
                    user_name,
                    user_email,
                    user_password,
                    user_verified
                )
                VALUES (?, ?, ?, false)
                """;

        try (
                Connection connection = databaseConnection.connection();
                PreparedStatement prst = connection.prepareStatement(
                        sql,
                        Statement.RETURN_GENERATED_KEYS
                )
        ) {

            prst.setString(1, userName);
            prst.setString(2, userEmail);
            prst.setString(3, userPassword);

            int rows = prst.executeUpdate();

            if (rows == 0) {
                throw new RuntimeException("User creation failed");
            }

            try (ResultSet rslt = prst.getGeneratedKeys()) {

                if (rslt.next()) {
                    return rslt.getLong(1);
                }
            }

        } catch (SQLException e) {
            throw new RuntimeException("Error creating user", e);
        }

        return null;
    }


    // ---------------------------------------------------------
    // VERIFY USER
    // ---------------------------------------------------------

    public boolean verifyUser(Long userId) {

        String sql = """
                UPDATE users
                SET user_verified = true
                WHERE user_id = ?
                """;

        try (
                Connection connection = databaseConnection.connection();
                PreparedStatement prst = connection.prepareStatement(sql)
        ) {

            prst.setLong(1, userId);

            return prst.executeUpdate() > 0;

        } catch (SQLException e) {
            throw new RuntimeException("Error verifying user", e);
        }
    }


    // ---------------------------------------------------------
    // CREATE ACCOUNT + WALLET
    // ---------------------------------------------------------

    public boolean createAccount(Long userId) {

        String accountSql = """
                INSERT INTO accounts
                (
                    user_id,
                    balance,
                    currency,
                    account_status
                )
                VALUES (?, 10000.0000, 'INR', 'ACTIVE')
                """;

        String walletSql = """
                INSERT INTO wallets
                (
                    user_id,
                    balance,
                    currency,
                    wallet_status
                )
                VALUES (?, 5000.0000, 'INR', 'ACTIVE')
                """;

        try (
                Connection connection = databaseConnection.connection()
        ) {

            try (
                    PreparedStatement accountStmt =
                            connection.prepareStatement(accountSql)
            ) {

                accountStmt.setLong(1, userId);

                int accountRows =
                        accountStmt.executeUpdate();

                if (accountRows == 0) {
                    throw new RuntimeException(
                            "Account creation failed"
                    );
                }
            }

            try (
                    PreparedStatement walletStmt =
                            connection.prepareStatement(walletSql)
            ) {

                walletStmt.setLong(1, userId);

                int walletRows =
                        walletStmt.executeUpdate();

                if (walletRows == 0) {
                    throw new RuntimeException(
                            "Wallet creation failed"
                    );
                }
            }

            return true;

        } catch (SQLException e) {

            throw new RuntimeException(
                    "Error creating account and wallet",
                    e
            );
        }
    }
}