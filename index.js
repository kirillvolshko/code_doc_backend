import dotenv from "dotenv";
import express from "express";
import routerUser from "./routes/user.routes.js";
import routerOrg from "./routes/organisation.routes.js";
import routerDoc from "./routes/documents.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorMiddleware from "./middlewares/error-middleware.js";
import { AppDataSource } from "./config/data-source.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", routerUser);
app.use("/api", routerOrg);
app.use("/api", routerDoc);
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
