import {
    articles,
    journalists,
    categories
} from '../models/data.js';

// GET /articles
export function listArticles(req, res) {
    res.json(articles);
}

// GET /articles/:id
export function showArticle(req, res) {
    const articleId = parseInt(req.params.id);
    const article = articles.find(article => article.id === articleId);

    if (!article) {
        return res.status(404).json({ error: 'Article not found' });
    }

    res.json(article);
}

// GET /articles/:id/details
export function showArticleDetails(req, res) {
    const articleId = parseInt(req.params.id);
    const article = articles.find(article => article.id === articleId);

    if (!article) {
        return res.status(404).json({ error: 'Article not found' });
    }

    const journalist = journalists.find(j => j.id === article.journalistId);
    const category = categories.find(c => c.id === article.categoryId);

    res.json({
        ...article,
        journalist,
        category
    });
}