
CREATE DATABASE IF NOT EXISTS smartqueue_db;

USE smartqueue_db;

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(40) PRIMARY KEY,
    name VARCHAR(70) NOT NULL,
    email VARCHAR(190) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS queue_counters (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    location_id VARCHAR(100) NOT NULL,
    service VARCHAR(150) NOT NULL,
    last_number INT UNSIGNED NOT NULL DEFAULT 0,
    UNIQUE KEY uq_queue_counter (location_id, service)
);

CREATE TABLE IF NOT EXISTS tokens (
    id VARCHAR(40) PRIMARY KEY,
    token_no VARCHAR(40) NOT NULL,
    user_id VARCHAR(40) NOT NULL,
    location_id VARCHAR(100) NOT NULL,
    location_name VARCHAR(150) NOT NULL,
    district VARCHAR(120) NOT NULL,
    village VARCHAR(120) NOT NULL,
    address VARCHAR(255) NOT NULL,
    service VARCHAR(150) NOT NULL,
    status ENUM(
        'Waiting',
        'Serving',
        'Completed',
        'Cancelled',
        'Skipped'
    ) NOT NULL DEFAULT 'Waiting',

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    called_at DATETIME NULL,
    completed_at DATETIME NULL,

    FOREIGN KEY (user_id)
        REFERENCES users(id),

    UNIQUE KEY uq_queue_token_no
        (location_id, service, token_no),

    KEY idx_queue_status
        (location_id, service, status)
);
