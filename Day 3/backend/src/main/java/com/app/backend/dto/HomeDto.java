package com.app.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class HomeDto {

    private String userName;

    private BigDecimal userAccountBalance;

    private BigDecimal userWalletBalance;

    private FinancialOverview financialOverview;

    private List<RecentTransaction> recentTransaction;

    public HomeDto() {
    }

    public HomeDto(
            String userName,
            BigDecimal userAccountBalance,
            BigDecimal userWalletBalance,
            FinancialOverview financialOverview,
            List<RecentTransaction> recentTransaction
    ) {
        this.userName = userName;
        this.userAccountBalance = userAccountBalance;
        this.userWalletBalance = userWalletBalance;
        this.financialOverview = financialOverview;
        this.recentTransaction = recentTransaction;
    }
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public BigDecimal getUserAccountBalance() {
        return userAccountBalance;
    }

    public void setUserAccountBalance(BigDecimal userAccountBalance) {
        this.userAccountBalance = userAccountBalance;
    }

    public BigDecimal getUserWalletBalance() {
        return userWalletBalance;
    }

    public void setUserWalletBalance(BigDecimal userWalletBalance) {
        this.userWalletBalance = userWalletBalance;
    }

    public FinancialOverview getFinancialOverview() {
        return financialOverview;
    }

    public void setFinancialOverview(FinancialOverview financialOverview) {
        this.financialOverview = financialOverview;
    }

    public List<RecentTransaction> getRecentTransaction() {
        return recentTransaction;
    }

    public void setRecentTransaction(
            List<RecentTransaction> recentTransaction
    ) {
        this.recentTransaction = recentTransaction;
    }
    public static class FinancialOverview {

        private BigDecimal income;

        private BigDecimal expense;

        private BigDecimal monthlySpend;

        public FinancialOverview() {
        }

        public FinancialOverview(
                BigDecimal income,
                BigDecimal expense,
                BigDecimal monthlySpend
        ) {
            this.income = income;
            this.expense = expense;
            this.monthlySpend = monthlySpend;
        }

        public BigDecimal getIncome() {
            return income;
        }

        public void setIncome(BigDecimal income) {
            this.income = income;
        }

        public BigDecimal getExpense() {
            return expense;
        }

        public void setExpense(BigDecimal expense) {
            this.expense = expense;
        }

        public BigDecimal getMonthlySpend() {
            return monthlySpend;
        }

        public void setMonthlySpend(BigDecimal monthlySpend) {
            this.monthlySpend = monthlySpend;
        }
    }
    public static class RecentTransaction {

        private String transactionName;

        private TransactionType transactionType;

        private BigDecimal transactionAmount;

        private LocalDateTime transactionDate;

        public RecentTransaction() {
        }

        public RecentTransaction(
                String transactionName,
                TransactionType transactionType,
                BigDecimal transactionAmount,
                LocalDateTime transactionDate
        ) {
            this.transactionName = transactionName;
            this.transactionType = transactionType;
            this.transactionAmount = transactionAmount;
            this.transactionDate = transactionDate;
        }

        public String getTransactionName() {
            return transactionName;
        }

        public void setTransactionName(String transactionName) {
            this.transactionName = transactionName;
        }

        public TransactionType getTransactionType() {
            return transactionType;
        }

        public void setTransactionType(
                TransactionType transactionType
        ) {
            this.transactionType = transactionType;
        }

        public BigDecimal getTransactionAmount() {
            return transactionAmount;
        }

        public void setTransactionAmount(
                BigDecimal transactionAmount
        ) {
            this.transactionAmount = transactionAmount;
        }

        public LocalDateTime getTransactionDate() {
            return transactionDate;
        }

        public void setTransactionDate(
                LocalDateTime transactionDate
        ) {
            this.transactionDate = transactionDate;
        }
    }
    public enum TransactionType {
        INCOMING,
        OUTGOING
    }
}