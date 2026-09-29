package com.app.backend.jdbc.model;

import java.math.BigDecimal;

public class FinancialOverviewModel {

    private BigDecimal income;

    private BigDecimal expense;

    private BigDecimal monthlySpend;

    private BigDecimal monthlyBudget;

    private BigDecimal spendingPercentage;


    public FinancialOverviewModel() {
    }


    public FinancialOverviewModel(
            BigDecimal income,
            BigDecimal expense,
            BigDecimal monthlySpend,
            BigDecimal monthlyBudget,
            BigDecimal spendingPercentage
    ) {
        this.income = income;
        this.expense = expense;
        this.monthlySpend = monthlySpend;
        this.monthlyBudget = monthlyBudget;
        this.spendingPercentage = spendingPercentage;
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


    public BigDecimal getMonthlyBudget() {
        return monthlyBudget;
    }

    public void setMonthlyBudget(BigDecimal monthlyBudget) {
        this.monthlyBudget = monthlyBudget;
    }


    public BigDecimal getSpendingPercentage() {
        return spendingPercentage;
    }

    public void setSpendingPercentage(
            BigDecimal spendingPercentage
    ) {
        this.spendingPercentage = spendingPercentage;
    }
}