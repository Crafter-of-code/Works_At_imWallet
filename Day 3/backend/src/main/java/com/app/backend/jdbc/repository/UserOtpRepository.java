
        package com.app.backend.jdbc.repository;

import com.app.backend.exeptions.NotFoundException;
import com.app.backend.jdbc.DatabaseConnection;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class UserOtpRepository {

    private final DatabaseConnection databaseConnection;

    public UserOtpRepository(
            DatabaseConnection databaseConnection
    ) {
        this.databaseConnection = databaseConnection;
    }

    /*
     * Save HASHED OTP
     *
     * The service generates:
     *
     * rawOtp = 482913
     *
     * then:
     *
     * hashedOtp = passwordEncoder.encode(rawOtp)
     *
     * Only hashedOtp is saved here.
     */
    public boolean setOtpForUserValidation(
            Long userId,
            String hashedOtp
    ) {

        String sqlQuery = """
                INSERT INTO userotp
                (
                    user_id,
                    otp_code,
                    expires_at,
                    used
                )
                VALUES
                (
                    ?,
                    ?,
                    DATE_ADD(NOW(), INTERVAL 5 MINUTE),
                    false
                )
                """;

        try (
                Connection connection =
                        databaseConnection.connection();

                PreparedStatement preparedStatement =
                        connection.prepareStatement(sqlQuery)
        ) {

            preparedStatement.setLong(
                    1,
                    userId
            );

            preparedStatement.setString(
                    2,
                    hashedOtp
            );

            return preparedStatement.executeUpdate() > 0;

        } catch (SQLException e) {

            throw new RuntimeException(
                    "Error while saving OTP",
                    e
            );
        }
    }


    /*
     * Get the latest valid OTP.
     *
     * IMPORTANT:
     * We DO NOT delete the OTP here.
     *
     * We need the hashed OTP so the service can perform:
     *
     * passwordEncoder.matches(rawOtp, hashedOtp)
     */
    public String getOtpforUserValidation(
            Long userId
    ) {

        String sqlQuery = """
                SELECT otp_code
                FROM userotp
                WHERE user_id = ?
                  AND used = false
                  AND expires_at > NOW()
                ORDER BY otp_id DESC
                LIMIT 1
                """;

        try (
                Connection connection =
                        databaseConnection.connection();

                PreparedStatement statement =
                        connection.prepareStatement(sqlQuery)
        ) {

            statement.setLong(
                    1,
                    userId
            );

            try (
                    ResultSet resultSet =
                            statement.executeQuery()
            ) {

                if (!resultSet.next()) {

                    throw new NotFoundException(
                            "OTP not found or expired for this user"
                    );
                }

                return resultSet.getString(
                        "otp_code"
                );
            }

        } catch (NotFoundException e) {

            throw e;

        } catch (SQLException e) {

            throw new RuntimeException(
                    "Unable to retrieve OTP",
                    e
            );
        }
    }


    /*
     * Mark the latest unused OTP as USED.
     *
     * This method is called ONLY after
     * passwordEncoder.matches() returns true.
     */
    public boolean markOtpAsUsed(
            Long userId
    ) {

        String sqlQuery = """
                UPDATE userotp
                SET used = true
                WHERE otp_id = (
                    SELECT otp_id
                    FROM (
                        SELECT otp_id
                        FROM userotp
                        WHERE user_id = ?
                          AND used = false
                        ORDER BY otp_id DESC
                        LIMIT 1
                    ) AS latest_otp
                )
                """;

        try (
                Connection connection =
                        databaseConnection.connection();

                PreparedStatement statement =
                        connection.prepareStatement(sqlQuery)
        ) {

            statement.setLong(
                    1,
                    userId
            );

            return statement.executeUpdate() > 0;

        } catch (SQLException e) {

            throw new RuntimeException(
                    "Error while marking OTP as used",
                    e
            );
        }
    }
}
