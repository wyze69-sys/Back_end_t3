import { Router } from "express";
import {
  getAllJournalists,
  getArticlesByJournalistId,
} from "../controllers/journalistController.js";

const journalistRouter = Router();

journalistRouter.get("/", getAllJournalists);
journalistRouter.get("/:id/articles", getArticlesByJournalistId);

export default journalistRouter;
