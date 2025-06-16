CREATE TABLE
  IF NOT EXISTS accounts (
    id VARCHAR(255) NOT NULL PRIMARY KEY COMMENT 'primary key',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Time Created',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last Update',
    name VARCHAR(255) COMMENT 'User Name',
    email VARCHAR(255) UNIQUE COMMENT 'User Email',
    picture VARCHAR(255) COMMENT 'User Picture'
  ) DEFAULT charset utf8mb4 COMMENT '';

CREATE TABLE
  cars (
    -- id should be our first column always
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    make VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    YEAR SMALLINT UNSIGNED NOT NULL,
    price MEDIUMINT UNSIGNED NOT NULL,
    img_url VARCHAR(1000) NOT NULL,
    description TEXT, -- 65,535
    engine_type ENUM ('V6', 'V8', 'V10', '4-cylinder', 'unknown', 'EV') NOT NULL,
    color VARCHAR(255) NOT NULL,
    mileage MEDIUMINT UNSIGNED NOT NULL,
    has_clean_title BOOLEAN NOT NULL,
    creator_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES accounts (id) ON DELETE CASCADE
  );

DROP TABLE cars;

INSERT INTO
  cars (
    make,
    model,
    YEAR,
    price,
    img_url,
    description,
    engine_type,
    color,
    mileage,
    has_clean_title,
    creator_id
  )
VALUES
  (
    'toyota',
    'camry',
    2004,
    5000,
    'https://images.unsplash.com/photo-1664287721774-13da4b108b18?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'freshly washed',
    '4-cylinder',
    'red',
    60000,
    FALSE,
    '65f87bc1e02f1ee243874743'
  );

SELECT
  *
FROM
  accounts;

SELECT
  *
FROM
  cars;

SELECT
  *
FROM
  cars
  INNER JOIN accounts ON cars.creator_id = accounts.id;

SELECT
  cars.*,
  accounts.*
FROM
  cars
  INNER JOIN accounts ON cars.creator_id = accounts.id;

SELECT
  *
FROM
  cars
  INNER JOIN accounts ON cars.creator_id = accounts.id
WHERE
  cars.id = 2;

SELECT
  *
FROM
  cars
WHERE
  make LIKE '%toyota%'
  AND model LIKE '%null%';

SELECT
  *
FROM
  cars
  INNER JOIN accounts ON accounts.id = cars.creator_id
ORDER BY
  cars.created_at;