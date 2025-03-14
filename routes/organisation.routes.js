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

routerOrg.get("/organisation/:id", authMiddleware, getOrganisationByUser);
routerOrg.post("/organisation", authMiddleware, createOrganisation);
routerOrg.delete("/organisation", authMiddleware, deleteOrganisation);
routerOrg.post("/organisation-add-user", authMiddleware, addUserToOrganisation);
routerOrg.delete("/organisation", authMiddleware, deleteUserFromOrganisation);
export default routerOrg;
