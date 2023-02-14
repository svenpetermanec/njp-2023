import express from "express";
import { promisePool } from "../config";
import { auth } from "../middleware/auth";
import { asyncErrorHandler } from "../middleware/errror";

export const comment = express.Router();

comment.use(auth);

comment.post(
  "/:articleId",
  asyncErrorHandler(async (req: any, res) => {
    const { articleId } = req.params;
    const { content } = req.body;

    await promisePool.query(
      `INSERT INTO comment (content, userId, articleId) VALUES ("${content}", ${req.id}, ${articleId})`
    );

    res.status(201).json({ status: "comment created" });
  })
);

comment.get(
  "/:articleId",
  asyncErrorHandler(async (req, res) => {
    const { articleId } = req.params;

    const [result] = await promisePool.query(
      `SELECT c.*, u.username FROM comment c JOIN users u ON c.userId = u.id WHERE articleId=${articleId}`
    );

    res.status(200).json(result);
  })
);
