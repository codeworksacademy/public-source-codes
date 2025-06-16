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
  cryptids (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    name VARCHAR(255) NOT NULL,
    threat_level TINYINT UNSIGNED NOT NULL,
    img_url VARCHAR(1000) NOT NULL,
    origin ENUM ('terrestrial', 'aquatic', 'hominid', 'flying') NOT NULL,
    size TINYINT UNSIGNED NOT NULL,
    description TEXT NOT NULL,
    discoverer_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (discoverer_id) REFERENCES accounts (id) ON DELETE CASCADE
  );

CREATE TABLE
  cryptid_encounters (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    account_id VARCHAR(255) NOT NULL,
    cryptid_id INT NOT NULL,
    FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE CASCADE,
    FOREIGN KEY (cryptid_id) REFERENCES cryptids (id) ON DELETE CASCADE
  );

SELECT
  accounts.*,
  cryptid_encounters.id AS cryptid_encounter_id,
  cryptid_encounters.created_at AS encountered_at
FROM
  cryptid_encounters
  INNER JOIN accounts ON accounts.id = cryptid_encounters.account_id
WHERE
  cryptid_id = 8;

SELECT
  cryptid_encounters.*,
  cryptids.*,
  accounts.*
FROM
  cryptid_encounters
  INNER JOIN cryptids ON cryptids.id = cryptid_encounters.cryptid_id
  INNER JOIN accounts ON accounts.id = cryptids.discoverer_id
WHERE
  account_id = '65f87bc1e02f1ee243874743';

SELECT
  *
FROM
  cryptids;

SELECT
  cryptids.*,
  COUNT(cryptid_encounters.id) AS encounter_count
FROM
  cryptids
  LEFT OUTER JOIN cryptid_encounters ON cryptids.id = cryptid_encounters.cryptid_id
GROUP BY
  cryptids.id;

SELECT
  COUNT(*)
FROM
  cryptid_encounters
WHERE
  cryptid_encounters.cryptid_id = 8;

SELECT
  cryptids.*,
  COUNT(cryptid_encounters.id) AS encounter_count,
  accounts.*
FROM
  cryptids
  LEFT OUTER JOIN cryptid_encounters ON cryptids.id = cryptid_encounters.cryptid_id
  INNER JOIN accounts ON accounts.id = cryptids.discoverer_id
GROUP BY
  cryptids.id
ORDER BY
  cryptids.id ASC;