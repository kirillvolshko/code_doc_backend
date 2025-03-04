import { Router } from "express";
import { createUser } from "../controller/user.controller.js";

const routerUser = new Router();

routerUser.post("/user", createUser);

export default routerUser;
