import { Router } from "express";
import {
  addUserToOrganisation,
  createOrganisation,
  deleteOrganisation,
  deleteUserFromOrganisation,
  getOrganisationByUser,
} from "../controller/organisation.controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const routerOrg = new Router();

routerOrg.get("/organisation-user/:id", authMiddleware, getOrganisationByUser);
routerOrg.post("/organisation", authMiddleware, createOrganisation);
routerOrg.delete("/organisation", authMiddleware, deleteOrganisation);
routerOrg.post("/organisation-user", authMiddleware, addUserToOrganisation);
routerOrg.delete(
  "/organisation-user",
  authMiddleware,
  deleteUserFromOrganisation
);
export default routerOrg;
