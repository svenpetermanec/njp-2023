import mysql from "mysql2";
import dontenv from "dotenv";

dontenv.config();

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: parseInt(process.env.DBPORT!),
});

export const promisePool = pool.promise();
