import express from "express";
import bcrypt from "bcrypt";
import { promisePool } from "../config";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { asyncErrorHandler } from "../middleware/errror";

dotenv.config();

export const auth = express.Router();

auth.post(
  "/register",
  asyncErrorHandler(async (req, res) => {
    const { username, email, password, isAdmin } = req.body;

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    const [result] = await promisePool.query(
      `INSERT INTO users (username, email, password, isAdmin) VALUES ("${username}", "${email}", "${hashedPassword}", ${isAdmin})`
    );

    sendSignedJwt(res, result.insertId, isAdmin);
  })
);

auth.post(
  "/login",
  asyncErrorHandler(async (req, res) => {
    const { username, password } = req.body;

    const [result] = await promisePool.query(
      `SELECT * FROM users WHERE username = "${username}"`
    );

    const isMatch = await bcrypt.compare(password, result[0].password);
    if (!isMatch) res.status(401).json({ status: "invalid credentials" });

    sendSignedJwt(res, result[0].id, result[0].isAdmin);
  })
);

const sendSignedJwt = (res: any, id: number, isAdmin: boolean) => {
  const payload = { user: { id, isAdmin } };

  jwt.sign(
    payload,
    process.env.jwtSecret!,
    { expiresIn: 36000000 },
    (err, token) => {
      if (err) throw err;
      res.status(201).json({ token });
    }
  );
};
