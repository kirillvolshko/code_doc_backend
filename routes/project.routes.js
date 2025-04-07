import { Router } from "express";
import {
  addUserToProject,
  createProject,
  deleteProject,
  deleteUserFromProject,
  getProjectById,
  getProjectByUser,
  getUsersByProject,
} from "../controller/project.controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const routerProject = new Router();

routerProject.get("/project-user/:id", authMiddleware, getProjectByUser);
routerProject.get("/project/:id", authMiddleware, getProjectById);
routerProject.get("/project-users/:id", authMiddleware, getUsersByProject);
routerProject.post("/project", authMiddleware, createProject);
routerProject.delete("/project/:id", authMiddleware, deleteProject);
routerProject.post("/project-user", authMiddleware, addUserToProject);
routerProject.delete(
  "/project-user/:id",
  authMiddleware,
  deleteUserFromProject,
);
export default routerProject;
