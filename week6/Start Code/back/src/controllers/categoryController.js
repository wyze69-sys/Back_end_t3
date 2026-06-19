import * as articleRepository from "../repositories/sqlArticleRepository.js";

// GET /api/categories
export async function getAllCategories(req, res) {
  try {
    const categories = await articleRepository.getCategories();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// GET /api/categories/:id/articles
export async function getArticlesByCategoryId(req, res) {
  try {
    const articles = await articleRepository.getArticlesByCategoryId(req.params.id);
    res.json(articles);
  } catch (error) {
    console.error("Error fetching category articles:", error);
    res.status(500).json({ message: "Server error" });
  }
}
