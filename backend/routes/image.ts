import express from "express";
import { asyncErrorHandler } from "../middleware/errror";
import path from "path";

const image = express.Router();

image.get(
  "/:imagePath",
  asyncErrorHandler(async (req, res) => {
    const { imagePath } = req.params;

    const file = path.resolve(
      path.resolve(`${__dirname}/../images/${imagePath}`)
    );

    res.sendFile(file);
  })
);

export default image;
