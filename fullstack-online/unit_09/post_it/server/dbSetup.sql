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
  albums (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    title VARCHAR(255) NOT NULL,
    description TINYTEXT,
    cover_img VARCHAR(1000) NOT NULL,
    archived BOOLEAN NOT NULL DEFAULT FALSE,
    category ENUM (
      'aesthetics',
      'food',
      'games',
      'animals',
      'vibes',
      'misc'
    ) NOT NULL,
    creator_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES accounts (id) ON DELETE CASCADE
  );

CREATE TABLE
  pictures (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    img_url VARCHAR(1000) NOT NULL,
    creator_id VARCHAR(255) NOT NULL,
    album_id INT NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES accounts (id) ON DELETE CASCADE,
    FOREIGN KEY (album_id) REFERENCES albums (id) ON DELETE CASCADE
  );

CREATE TABLE
  watchers (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    account_id VARCHAR(255) NOT NULL,
    album_id INT NOT NULL,
    FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE CASCADE,
    FOREIGN KEY (album_id) REFERENCES albums (id) ON DELETE CASCADE,
    UNIQUE (account_id, album_id) -- you can only watch an album once
  );

SELECT
  albums.*,
  accounts.*
FROM
  albums
  INNER JOIN accounts ON albums.creator_id = accounts.id;

SELECT
  pictures.*,
  accounts.*
FROM
  pictures
  INNER JOIN accounts ON pictures.creator_id = accounts.id;

SELECT
  *
FROM
  pictures
WHERE
  pictures.album_id = 12;

SELECT
  *
FROM
  watchers;

INSERT INTO
  watchers (account_id, album_id)
VALUES
  ('670ff93326693293c631476f', 21);

SELECT
  *
FROM
  accounts;

SELECT
  watchers.*,
  accounts.*
FROM
  watchers
  INNER JOIN accounts ON accounts.id = watchers.account_id
WHERE
  watchers.album_id = 27;

SELECT
  watchers.*,
  albums.*,
  accounts.*
FROM
  watchers
  INNER JOIN albums ON albums.id = watchers.album_id
  INNER JOIN accounts ON accounts.id = albums.creator_id
WHERE
  watchers.account_id = '65f87bc1e02f1ee243874743';