package com.app.backend.jdbc.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class RecentTransactionModel {

    private Long transactionId;

    private String transactionName;

    private String transactionType;

    private BigDecimal transactionAmount;

    private LocalDateTime transactionDate;


    public RecentTransactionModel() {
    }


    public RecentTransactionModel(
            Long transactionId,
            String transactionName,
            String transactionType,
            BigDecimal transactionAmount,
            LocalDateTime transactionDate
    ) {
        this.transactionId = transactionId;
        this.transactionName = transactionName;
        this.transactionType = transactionType;
        this.transactionAmount = transactionAmount;
        this.transactionDate = transactionDate;
    }


    public Long getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
    }


    public String getTransactionName() {
        return transactionName;
    }

    public void setTransactionName(String transactionName) {
        this.transactionName = transactionName;
    }


    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
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