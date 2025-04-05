import { Router } from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  refreshUser,
} from "../controller/user.controller.js";
import { body } from "express-validator";

const routerUser = new Router();

routerUser.post(
  "/registration",
  body("password").isLength({ min: 3, max: 32 }),
  createUser,
);
routerUser.post("/login", loginUser);
routerUser.post("/logout", logoutUser);
routerUser.get("/refresh", refreshUser);

export default routerUser;
