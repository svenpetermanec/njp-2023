import express from "express";
import { promisePool } from "../config";
import { auth } from "../middleware/auth";
import { asyncErrorHandler } from "../middleware/errror";

export const category = express.Router();

category.use(auth);

category.post(
  "/",
  asyncErrorHandler(async (req: any, res) => {
    const { title } = req.body;

    await promisePool.query(
      `INSERT INTO category (title, createdByUser) VALUES ("${title}", ${req.id})`
    );

    res.status(201).json({ status: "category created" });
  })
);

category.get(
  "/:category",
  asyncErrorHandler(async (req, res) => {
    const { category } = req.params;

    const [result] = await promisePool.query(
      `SELECT a.title, a.content, a.imagePath, a.createdAt, c.title category, u.username 
            FROM article a 
            JOIN category c ON c.id = a.categoryId 
            JOIN users u ON u.id = a.userId 
            WHERE c.title = "${category}"`
    );

    res.status(200).json(result);
  })
);

category.get(
  "/",
  asyncErrorHandler(async (req, res) => {
    const [result] = await promisePool.query(`SELECT id, title FROM category`);

    res.status(200).json(result);
  })
);
