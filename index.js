import dotenv from "dotenv";
import express from "express";
import routerUser from "./routes/user.routes.js";
import routerProject from "./routes/project.routes.js";
import routerDoc from "./routes/documents.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorMiddleware from "./middlewares/error-middleware.js";
import { AppDataSource } from "./config/data-source.js";
import routerComment from "./routes/comment.routes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.options(
  "*",
  cors({
    origin: ["http://localhost:3000", "https://code-doc-client.vercel.app"],
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  }),
);
app.use(
  cors({
    origin: ["http://localhost:3000", "https://code-doc-client.vercel.app"],
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  }),
);

app.use("/api", routerUser);
app.use("/api", routerProject);
app.use("/api", routerDoc);
app.use("/api", routerComment);
app.use(errorMiddleware);

AppDataSource.initialize();
async function startApp() {
  try {
    app.listen(PORT, () => console.log("START SERVER " + PORT));
  } catch (e) {
    console.log(e);
  }
}
startApp();
