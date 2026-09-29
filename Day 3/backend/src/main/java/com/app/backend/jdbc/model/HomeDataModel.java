package com.app.backend.jdbc.model;

import java.math.BigDecimal;
import java.util.List;

public class HomeDataModel {

    private String userName;

    private BigDecimal userAccountBalance;

    private BigDecimal userWalletBalance;

    private FinancialOverviewModel financialOverview;

    private List<RecentTransactionModel> recentTransaction;


    public HomeDataModel() {
    }


    public HomeDataModel(
            String userName,
            BigDecimal userAccountBalance,
            BigDecimal userWalletBalance,
            FinancialOverviewModel financialOverview,
            List<RecentTransactionModel> recentTransaction
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


    public FinancialOverviewModel getFinancialOverview() {
        return financialOverview;
    }

    public void setFinancialOverview(
            FinancialOverviewModel financialOverview
    ) {
        this.financialOverview = financialOverview;
    }


    public List<RecentTransactionModel> getRecentTransaction() {
        return recentTransaction;
    }

    public void setRecentTransaction(
            List<RecentTransactionModel> recentTransaction
    ) {
        this.recentTransaction = recentTransaction;
    }
}