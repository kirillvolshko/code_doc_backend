import { Router } from "express";
import authMiddleware from "../middlewares/auth-middleware.js";
import {
  createComment,
  deleteComment,
  getComment,
  updateComment,
} from "../controller/comment.controller.js";

const routerComment = new Router();

routerComment.get("/comment/:id", authMiddleware, getComment);
routerComment.post("/comment", authMiddleware, createComment);
routerComment.patch("/comment/:id", authMiddleware, updateComment);
routerComment.delete("/comment/:id", authMiddleware, deleteComment);

export default routerComment;
