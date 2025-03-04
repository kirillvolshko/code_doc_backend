import dotenv from "dotenv";
import express from "express";
import routerUser from "./routes/user.routes.js";
import routerOrg from "./routes/organisation.routes.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.use("/api", routerUser);
app.use("/api", routerOrg);

async function startApp() {
  try {
    app.listen(PORT, () => console.log("START SERVER " + PORT));
  } catch (e) {
    console.log(e);
  }
}
startApp();
