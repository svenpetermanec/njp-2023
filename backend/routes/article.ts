import express from "express";
import multer from "multer";
import { promisePool } from "../config";
import { auth } from "../middleware/auth";
import { asyncErrorHandler } from "../middleware/errror";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, `${__dirname}/../images`),
    filename: (req, file, cb) => cb(null, Date.now() + ".jpeg"),
  }),
});

export const article = express.Router();

article.use(auth);

article.post(
  "/",
  upload.single("image"),
  asyncErrorHandler(async (req: any, res) => {
    const { title, content, categoryId } = req.body;

    await promisePool.query(
      `INSERT INTO article (title, content, userId, categoryId, imagePath) VALUES ("${title}", "${content}", ${req.id}, ${categoryId}, "${req.file.filename}")`
    );

    res.status(200).json({ status: "article created" });
  })
);

article.get(
  "/:articleId",
  asyncErrorHandler(async (req, res) => {
    const { articleId } = req.params;

    const [result] = await promisePool.query(
      `SELECT a.id, a.title, a.content, a.imagePath, a.createdAt, c.title category, u.username, u.id userId FROM article a 
            JOIN category c ON c.id = a.categoryId 
            JOIN users u ON u.id = a.userId
            WHERE a.id = ${articleId}`
    );

    res.status(200).json(result[0]);
  })
);

article.put(
  "/:articleId",
  asyncErrorHandler(async (req, res) => {
    const { articleId } = req.params;
    const { title, content, category } = req.body;

    await promisePool.query(
      `UPDATE article 
            SET title = "${title}", content = "${content}" 
            WHERE id = ${articleId}`
    );

    res.status(200).json({ status: "article updated" });
  })
);

article.delete(
  "/:articleId",
  asyncErrorHandler(async (req, res) => {
    const { articleId } = req.params;

    await promisePool.query(`DELETE FROM article WHERE id = ${articleId}`);

    res.status(200).json({ status: "article deleted" });
  })
);

article.get(
  "/",
  asyncErrorHandler(async (req, res) => {
    const [result] = await promisePool.query(
      `SELECT a.id, a.title, a.content, a.imagePath, a.createdAt, c.title category, u.username, u.id userId FROM article a 
            JOIN category c ON c.id = a.categoryId 
            JOIN users u ON u.id = a.userId`
    );

    res.status(200).json(result);
  })
);
