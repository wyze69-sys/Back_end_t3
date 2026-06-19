import { Router } from "express";
import {
  getAllCategories,
  getArticlesByCategoryId,
} from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id/articles", getArticlesByCategoryId);

export default categoryRouter;
