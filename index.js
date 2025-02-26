import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

import express from "express";
import mongoose from "mongoose";
import router from "./router.js";

const app = express();
app.use(express.json());
app.use("/api", router);

async function startApp() {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log("START SERVER " + PORT));
  } catch (e) {
    console.log(e);
  }
}
startApp();
