package com.app.backend.jdbc.repository;

import com.app.backend.jdbc.DatabaseConnection;
import com.app.backend.jdbc.model.*;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class UserRepository {

    private final DatabaseConnection databaseConnection;

    public UserRepository(
            DatabaseConnection databaseConnection
    ) {
        this.databaseConnection = databaseConnection;
    }

    public HomeDataModel getHomeData(
            String userEmail
    ) {

        String userSql = """
                SELECT
                    user_id,
                    user_name
                FROM users
                WHERE user_email = ?
                """;

        String accountSql = """
                SELECT
                    balance
                FROM accounts
                WHERE user_id = ?
                  AND account_status = 'ACTIVE'
                LIMIT 1
                """;

        String walletSql = """
                SELECT
                    balance
                FROM wallets
                WHERE user_id = ?
                  AND wallet_status = 'ACTIVE'
                LIMIT 1
                """;

        try (
                Connection connection =
                        databaseConnection.connection();

                PreparedStatement userStatement =
                        connection.prepareStatement(userSql)
        ) {

            userStatement.setString(
                    1,
                    userEmail
            );

            try (
                    ResultSet userResult =
                            userStatement.executeQuery()
            ) {

                if (!userResult.next()) {
                    return null;
                }

                Long userId =
                        userResult.getLong("user_id");

                String userName =
                        userResult.getString("user_name");

                BigDecimal accountBalance =
                        BigDecimal.ZERO;

                BigDecimal walletBalance =
                        BigDecimal.ZERO;

                // Account
                try (
                        PreparedStatement accountStatement =
                                connection.prepareStatement(
                                        accountSql
                                )
                ) {

                    accountStatement.setLong(
                            1,
                            userId
                    );

                    try (
                            ResultSet accountResult =
                                    accountStatement.executeQuery()
                    ) {

                        if (accountResult.next()) {

                            accountBalance =
                                    accountResult.getBigDecimal(
                                            "balance"
                                    );

                            if (accountBalance == null) {
                                accountBalance =
                                        BigDecimal.ZERO;
                            }
                        }
                    }
                }

                // Wallet
                try (
                        PreparedStatement walletStatement =
                                connection.prepareStatement(
                                        walletSql
                                )
                ) {

                    walletStatement.setLong(
                            1,
                            userId
                    );

                    try (
                            ResultSet walletResult =
                                    walletStatement.executeQuery()
                    ) {

                        if (walletResult.next()) {

                            walletBalance =
                                    walletResult.getBigDecimal(
                                            "balance"
                                    );

                            if (walletBalance == null) {
                                walletBalance =
                                        BigDecimal.ZERO;
                            }
                        }
                    }
                }

                // Financial Overview
                FinancialOverviewModel financialOverview =
                        getFinancialOverview(
                                connection,
                                userId
                        );

                // Recent Transactions
                List<RecentTransactionModel> recentTransactions =
                        getRecentTransactions(
                                connection,
                                userId
                        );

                return new HomeDataModel(
                        userName,
                        accountBalance,
                        walletBalance,
                        financialOverview,
                        recentTransactions
                );
            }

        } catch (SQLException e) {

            throw new RuntimeException(
                    "Error while fetching home data",
                    e
            );
        }
    }

    private FinancialOverviewModel getFinancialOverview(
            Connection connection,
            Long userId
    ) throws SQLException {

        String sql = """
                SELECT

                    COALESCE(
                        SUM(
                            CASE
                                WHEN transaction_type = 'INCOMING'
                                THEN transaction_amount
                                ELSE 0
                            END
                        ),
                        0
                    ) AS income,

                    COALESCE(
                        SUM(
                            CASE
                                WHEN transaction_type = 'OUTGOING'
                                THEN transaction_amount
                                ELSE 0
                            END
                        ),
                        0
                    ) AS expense

                FROM transactions

                WHERE user_id = ?

                  AND transaction_status = 'COMPLETED'

                  AND YEAR(transaction_date) =
                      YEAR(CURRENT_DATE)

                  AND MONTH(transaction_date) =
                      MONTH(CURRENT_DATE)
                """;

        BigDecimal income =
                BigDecimal.ZERO;

        BigDecimal expense =
                BigDecimal.ZERO;

        try (
                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setLong(
                    1,
                    userId
            );

            try (
                    ResultSet resultSet =
                            statement.executeQuery()
            ) {

                if (resultSet.next()) {

                    income =
                            resultSet.getBigDecimal(
                                    "income"
                            );

                    expense =
                            resultSet.getBigDecimal(
                                    "expense"
                            );

                    if (income == null) {
                        income =
                                BigDecimal.ZERO;
                    }

                    if (expense == null) {
                        expense =
                                BigDecimal.ZERO;
                    }
                }
            }
        }

        BigDecimal monthlySpend =
                expense;

        // Temporary monthly budget
        BigDecimal monthlyBudget =
                new BigDecimal("30000.00");

        BigDecimal spendingPercentage =
                BigDecimal.ZERO;

        if (
                monthlyBudget.compareTo(
                        BigDecimal.ZERO
                ) > 0
        ) {

            spendingPercentage =
                    monthlySpend
                            .multiply(
                                    new BigDecimal("100")
                            )
                            .divide(
                                    monthlyBudget,
                                    2,
                                    RoundingMode.HALF_UP
                            );
        }

        return new FinancialOverviewModel(
                income,
                expense,
                monthlySpend,
                monthlyBudget,
                spendingPercentage
        );
    }

    private List<RecentTransactionModel> getRecentTransactions(
            Connection connection,
            Long userId
    ) throws SQLException {

        String sql = """
                SELECT
                    transaction_id,
                    transaction_name,
                    transaction_type,
                    transaction_amount,
                    transaction_date

                FROM transactions

                WHERE user_id = ?

                ORDER BY transaction_date DESC

                LIMIT 4
                """;

        List<RecentTransactionModel> transactions =
                new ArrayList<>();

        try (
                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setLong(
                    1,
                    userId
            );

            try (
                    ResultSet resultSet =
                            statement.executeQuery()
            ) {

                while (resultSet.next()) {

                    RecentTransactionModel transaction =
                            new RecentTransactionModel();

                    transaction.setTransactionId(
                            resultSet.getLong(
                                    "transaction_id"
                            )
                    );

                    transaction.setTransactionName(
                            resultSet.getString(
                                    "transaction_name"
                            )
                    );

                    String transactionType =
                            resultSet.getString(
                                    "transaction_type"
                            );

                    if (transactionType != null) {

                        transactionType =
                                transactionType.toLowerCase();
                    }

                    transaction.setTransactionType(
                            transactionType
                    );

                    transaction.setTransactionAmount(
                            resultSet.getBigDecimal(
                                    "transaction_amount"
                            )
                    );

                    Timestamp timestamp =
                            resultSet.getTimestamp(
                                    "transaction_date"
                            );

                    if (timestamp != null) {

                        transaction.setTransactionDate(
                                timestamp.toLocalDateTime()
                        );
                    }

                    transactions.add(
                            transaction
                    );
                }
            }
        }

        return transactions;
    }
    public List<UserSearchModel> searchUsers(
            String query,
            String currentUserEmail
    ) {

        String sql = """
            SELECT
                user_id,
                user_name,
                user_email
            FROM users
            WHERE
                (
                    user_name LIKE ?
                    OR user_email LIKE ?
                )
                AND user_email != ?
            LIMIT 20
            """;

        List<UserSearchModel> users =
                new ArrayList<>();

        String searchQuery =
                "%" + query.trim() + "%";

        try (
                Connection connection =
                        databaseConnection.connection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setString(
                    1,
                    searchQuery
            );

            statement.setString(
                    2,
                    searchQuery
            );

            statement.setString(
                    3,
                    currentUserEmail
            );

            try (
                    ResultSet resultSet =
                            statement.executeQuery()
            ) {

                while (resultSet.next()) {

                    UserSearchModel user =
                            new UserSearchModel();

                    user.setUserId(
                            resultSet.getLong(
                                    "user_id"
                            )
                    );

                    user.setUserName(
                            resultSet.getString(
                                    "user_name"
                            )
                    );

                    user.setUserEmail(
                            resultSet.getString(
                                    "user_email"
                            )
                    );

                    users.add(user);
                }
            }

        } catch (SQLException e) {

            throw new RuntimeException(
                    "Error while searching users",
                    e
            );
        }

        return users;
    }

}