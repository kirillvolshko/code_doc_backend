import { Router } from "express";
import { createUser } from "../controller/user.controller.js";
import { body } from "express-validator";

const routerUser = new Router();

routerUser.post(
  "/registration",
  body("password").isLength({ min: 3, max: 32 }),
  createUser
);
routerUser.post("/login");
routerUser.post("/logout");
routerUser.get("/refresh");
routerUser.get("/users");

export default routerUser;
