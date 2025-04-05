import { Router } from "express";
import {
  addUserToProject,
  createProject,
  deleteProject,
  deleteUserFromProject,
  getProjectByUser,
} from "../controller/project.controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const routerOrg = new Router();

routerOrg.get("/project-user/:id", authMiddleware, getProjectByUser);
routerOrg.post("/project", authMiddleware, createProject);
routerOrg.delete("/project/:id", authMiddleware, deleteProject);
routerOrg.post("/project-user", authMiddleware, addUserToProject);
routerOrg.delete("/project-user", authMiddleware, deleteUserFromProject);
export default routerOrg;
