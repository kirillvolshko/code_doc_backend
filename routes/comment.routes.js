import { Router } from "express";
import authMiddleware from "../middlewares/auth-middleware.js";
import { createComment } from "../controller/comment.controller.js";

const routerComment = new Router();

routerComment.get("/comment/:id", authMiddleware);
routerComment.post("/comment", authMiddleware, createComment);
routerComment.patch("/comment/:id", authMiddleware);
routerComment.delete("/comment/:id", authMiddleware);

export default routerComment;
