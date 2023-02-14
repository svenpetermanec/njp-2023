import express from "express";
import cors from "cors";
import { auth } from "./routes/auth";
import { category } from "./routes/category";
import { article } from "./routes/article";
import { comment } from "./routes/comment";
import image from "./routes/image";
import path from "path";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", auth);
app.use("/category", category);
app.use("/article", article);
app.use("/comment", comment);
app.use("/image", image);

app.use(express.static(path.resolve(`frontend/dist`)));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(`frontend/dist/index.html`));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
