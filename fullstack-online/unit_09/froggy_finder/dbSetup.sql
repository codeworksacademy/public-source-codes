-- Active: 1747169919014@@mysql.codeworksacademy.com@3306@motivated_chupacabra_0684_db
CREATE TABLE
  frogs (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    age TINYINT UNSIGNED NOT NULL,
    is_single BOOLEAN
  );

ALTER TABLE frogs ADD CHECK (age >= 18);

INSERT INTO
  frogs (name, color, age, is_single)
VALUES
  ('jake', 'beige', 25, FALSE),
  ('mick', 'red', 24, FALSE),
  ('louie', 'green', 18, TRUE),
  ('petunai', 'purple', 45, TRUE);

SELECT
  name
FROM
  frogs;

SELECT
  age,
  name
FROM
  frogs;

SELECT
  id,
  name,
  color,
  age,
  is_single
FROM
  frogs;

SELECT
  *
FROM
  frogs;

SELECT
  *
FROM
  frogs
WHERE
  age > 30
  AND color = 'pink';

SELECT
  name AS cool_name
FROM
  frogs
ORDER BY
  name;

SELECT
  *
FROM
  frogs
WHERE
  id = 5;

UPDATE frogs
SET
  age = 30
WHERE
  id = 3;

DELETE FROM frogs
WHERE
  id = 3;

DROP TABLE frogs_2;