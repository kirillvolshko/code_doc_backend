import { Router } from "express";
import authMiddleware from "../middlewares/auth-middleware";

const routerNotofication = new Router();

routerNotofication.get("/notification-project/", authMiddleware);

export default routerNotofication;
