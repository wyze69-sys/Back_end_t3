USE week6Db;

-- =====================================================
-- EXERCISE 3: Handle Journalists
-- =====================================================

CREATE TABLE IF NOT EXISTS journalists (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  bio TEXT
);

INSERT IGNORE INTO journalists (id, name, email, bio)
VALUES
  (1, 'RONAN', 'ronan@example.com', 'Technology journalist.'),
  (2, 'Linh', 'linh@example.com', 'Backend and frontend writer.'),
  (3, 'Alice', 'alice@example.com', 'Frontend specialist.'),
  (4, 'Bob', 'bob@example.com', 'Web development writer.');

-- Add journalist_id only if it does not already exist.
SET @column_exists = (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'articles'
    AND COLUMN_NAME = 'journalist_id'
);

SET @sql = IF(
  @column_exists = 0,
  'ALTER TABLE articles ADD COLUMN journalist_id INT NULL',
  'SELECT "journalist_id already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

UPDATE articles SET journalist_id = 1 WHERE journalist = 'RONAN' AND journalist_id IS NULL;
UPDATE articles SET journalist_id = 2 WHERE journalist = 'Linh' AND journalist_id IS NULL;
UPDATE articles SET journalist_id = 3 WHERE journalist = 'Alice' AND journalist_id IS NULL;
UPDATE articles SET journalist_id = 4 WHERE journalist = 'Bob' AND journalist_id IS NULL;

-- Add foreign key only if it does not already exist.
SET @fk_exists = (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'articles'
    AND CONSTRAINT_NAME = 'fk_articles_journalist'
);

SET @sql = IF(
  @fk_exists = 0,
  'ALTER TABLE articles ADD CONSTRAINT fk_articles_journalist FOREIGN KEY (journalist_id) REFERENCES journalists(id)',
  'SELECT "fk_articles_journalist already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- =====================================================
-- EXERCISE 4: Handle Tags / Categories (BONUS)
-- =====================================================

CREATE TABLE IF NOT EXISTS categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS article_categories (
  article_id INT NOT NULL,
  category_id INT NOT NULL,
  PRIMARY KEY (article_id, category_id),
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

INSERT IGNORE INTO categories (id, name)
VALUES
  (1, 'Technology'),
  (2, 'Frontend'),
  (3, 'Backend'),
  (4, 'Work'),
  (5, 'AI');

-- Link existing articles to categories using the old articles.category text column.
INSERT IGNORE INTO article_categories (article_id, category_id)
SELECT a.id, c.id
FROM articles a
JOIN categories c ON c.name = a.category;

-- Example result checks
SELECT * FROM journalists;
SELECT * FROM categories;

SELECT a.id, a.title, j.name AS journalist_name
FROM articles a
LEFT JOIN journalists j ON a.journalist_id = j.id;

SELECT a.id, a.title, c.name AS category_name
FROM articles a
JOIN article_categories ac ON a.id = ac.article_id
JOIN categories c ON ac.category_id = c.id;
