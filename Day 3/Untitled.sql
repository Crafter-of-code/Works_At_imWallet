-- ============================================================
-- FINANCIAL APPLICATION DATABASE
-- MySQL
-- ============================================================


-- ============================================================
-- OPTIONAL: CREATE DATABASE
-- ============================================================

CREATE DATABASE IF NOT EXISTS financial_app;

USE financial_app;


-- ============================================================
-- 1. USERS TABLE
-- ============================================================

CREATE TABLE users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,

    user_name VARCHAR(225) NOT NULL,

    user_email VARCHAR(254) NOT NULL UNIQUE,

    user_password VARCHAR(255) NOT NULL,

    user_verified BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);
ALTER TABLE accounts
MODIFY COLUMN balance DECIMAL(19,4) NOT NULL DEFAULT 5000.0000;
-- ============================================================
-- 2. ACCOUNTS TABLE
-- One user = one account
-- ============================================================

CREATE TABLE accounts (
    account_id BIGINT PRIMARY KEY AUTO_INCREMENT,

    user_id BIGINT NOT NULL UNIQUE,

    balance DECIMAL(19,4) NOT NULL DEFAULT 50.000,

    currency VARCHAR(3) NOT NULL DEFAULT 'INR',

    account_status ENUM(
        'ACTIVE',
        'BLOCKED',
        'CLOSED'
    ) NOT NULL DEFAULT 'ACTIVE',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_account_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id),

    CONSTRAINT chk_account_balance
        CHECK (balance >= 0)
);


-- ============================================================
-- 3. WALLETS TABLE
-- One user = one wallet
-- ============================================================

CREATE TABLE wallets (
    wallet_id BIGINT PRIMARY KEY AUTO_INCREMENT,

    user_id BIGINT NOT NULL UNIQUE,

    balance DECIMAL(19,4) NOT NULL DEFAULT 0.0000,

    currency VARCHAR(3) NOT NULL DEFAULT 'INR',

    wallet_status ENUM(
        'ACTIVE',
        'BLOCKED',
        'CLOSED'
    ) NOT NULL DEFAULT 'ACTIVE',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_wallet_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id),

    CONSTRAINT chk_wallet_balance
        CHECK (balance >= 0)
);


-- ============================================================
-- 4. USER OTP TABLE
-- ============================================================

CREATE TABLE userotp (
    otp_id BIGINT PRIMARY KEY AUTO_INCREMENT,

    user_id BIGINT NOT NULL,

    otp_code VARCHAR(255) NOT NULL,

    expires_at TIMESTAMP NOT NULL,

    used BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_otp_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id),

    INDEX idx_otp_user (user_id),

    INDEX idx_otp_expiry (expires_at)
);


-- ============================================================
-- 5. TRANSACTIONS TABLE
-- ============================================================

CREATE TABLE transactions (
    transaction_id BIGINT PRIMARY KEY AUTO_INCREMENT,

    user_id BIGINT NOT NULL,

    wallet_id BIGINT NOT NULL,

    transaction_name VARCHAR(225) NOT NULL,

    transaction_type ENUM(
        'INCOMING',
        'OUTGOING'
    ) NOT NULL,

    transaction_status ENUM(
        'PENDING',
        'COMPLETED',
        'FAILED',
        'CANCELLED'
    ) NOT NULL DEFAULT 'COMPLETED',

    transaction_amount DECIMAL(19,4) NOT NULL,

    transaction_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,


    -- User who owns the transaction
    CONSTRAINT fk_transaction_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id),


    -- Wallet associated with transaction
    CONSTRAINT fk_transaction_wallet
        FOREIGN KEY (wallet_id)
        REFERENCES wallets(wallet_id),


    -- Amount must be greater than zero
    CONSTRAINT chk_transaction_amount
        CHECK (transaction_amount > 0),


    -- Index for user's transaction history
    INDEX idx_transactions_user_date (
        user_id,
        transaction_date
    ),


    -- Index for wallet transaction history
    INDEX idx_transactions_wallet_date (
        wallet_id,
        transaction_date
    )
);


-- ============================================================
-- VERIFY TABLES
-- ============================================================

SHOW TABLES;

CREATE TABLE messages (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    sender_id BIGINT NOT NULL,
    receiver_id BIGINT NOT NULL,

    message TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (sender_id) REFERENCES users(user_id),
    FOREIGN KEY (receiver_id) REFERENCES users(user_id)
);

-- ============================================================
-- OPTIONAL: VIEW TABLE STRUCTURE
-- ============================================================

DESCRIBE users;

DESCRIBE accounts;

DESCRIBE wallets;

DESCRIBE userotp;

DESCRIBE transactions;
use testingData;
show tables;
select * from user;
select * from user_otp;

