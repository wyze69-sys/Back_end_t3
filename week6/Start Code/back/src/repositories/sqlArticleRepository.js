//
// This repository connects the backend to MySQL.
// It contains the SQL queries for articles, journalists, and categories.
//
import { pool } from "../utils/database.js";

const articleSelect = `
  SELECT
    a.id,
    a.title,
    a.content,
    COALESCE(j.name, a.journalist) AS journalist,
    a.journalist_id,
    a.category,
    j.name AS journalist_name,
    j.email AS journalist_email,
    j.bio AS journalist_bio,
    GROUP_CONCAT(DISTINCT c.name ORDER BY c.name SEPARATOR ', ') AS categories
  FROM articles a
  LEFT JOIN journalists j ON a.journalist_id = j.id
  LEFT JOIN article_categories ac ON a.id = ac.article_id
  LEFT JOIN categories c ON ac.category_id = c.id
`;

const articleGroupBy = `
  GROUP BY
    a.id,
    a.title,
    a.content,
    a.journalist,
    a.journalist_id,
    a.category,
    j.name,
    j.email,
    j.bio
`;

// Get all articles, including journalist name and category names when available.
export async function getArticles() {
  const [rows] = await pool.query(`${articleSelect} ${articleGroupBy} ORDER BY a.id`);
  return rows;
}

// Get one article by ID, including journalist information.
export async function getArticleById(id) {
  const [rows] = await pool.query(
    `${articleSelect} WHERE a.id = ? ${articleGroupBy}`,
    [id]
  );
  return rows[0];
}

// Create a new article.
export async function createArticle(article) {
  const { title, content, journalist, category, journalist_id } = article;

  const [result] = await pool.query(
    "INSERT INTO articles (title, content, journalist, category, journalist_id) VALUES (?, ?, ?, ?, ?)",
    [title, content, journalist, category, journalist_id || null]
  );

  return getArticleById(result.insertId);
}

// Update an article by ID.
export async function updateArticle(id, updatedData) {
  const { title, content, journalist, category, journalist_id } = updatedData;

  const [result] = await pool.query(
    "UPDATE articles SET title = ?, content = ?, journalist = ?, category = ?, journalist_id = ? WHERE id = ?",
    [title, content, journalist, category, journalist_id || null, id]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return getArticleById(id);
}

// Delete an article by ID.
export async function deleteArticle(id) {
  const [result] = await pool.query("DELETE FROM articles WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

// EXERCISE 3: Get all journalists.
export async function getJournalists() {
  const [rows] = await pool.query("SELECT * FROM journalists ORDER BY name");
  return rows;
}

// EXERCISE 3: Get all articles written by a specific journalist.
export async function getArticlesByJournalistId(journalistId) {
  const [rows] = await pool.query(
    `${articleSelect} WHERE j.id = ? ${articleGroupBy} ORDER BY a.id`,
    [journalistId]
  );
  return rows;
}

// EXERCISE 4 BONUS: Get all categories.
export async function getCategories() {
  const [rows] = await pool.query("SELECT * FROM categories ORDER BY name");
  return rows;
}

// EXERCISE 4 BONUS: Get all articles filtered by category.
export async function getArticlesByCategoryId(categoryId) {
  const [rows] = await pool.query(
    `${articleSelect} WHERE c.id = ? ${articleGroupBy} ORDER BY a.id`,
    [categoryId]
  );
  return rows;
}
