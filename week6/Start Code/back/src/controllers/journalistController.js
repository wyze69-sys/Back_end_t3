import * as articleRepository from "../repositories/sqlArticleRepository.js";

// GET /api/journalists
export async function getAllJournalists(req, res) {
  try {
    const journalists = await articleRepository.getJournalists();
    res.json(journalists);
  } catch (error) {
    console.error("Error fetching journalists:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// GET /api/journalists/:id/articles
export async function getArticlesByJournalistId(req, res) {
  try {
    const articles = await articleRepository.getArticlesByJournalistId(req.params.id);
    res.json(articles);
  } catch (error) {
    console.error("Error fetching journalist articles:", error);
    res.status(500).json({ message: "Server error" });
  }
}
