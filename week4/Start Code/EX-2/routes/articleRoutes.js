import express from 'express';

import {
    listArticles,
    showArticle,
    showArticleDetails
} from '../controllers/articleController.js';

const router = express.Router();

// GET /articles
router.get('/', listArticles);

// GET /articles/:id/details
router.get('/:id/details', showArticleDetails);

// GET /articles/:id
router.get('/:id', showArticle);

export default router;