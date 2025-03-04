import { Router } from "express";
import {
  addUserToOrganisation,
  createOrganisation,
  deleteUserFromOrganisation,
  getOrganisationByUser,
} from "../controller/organisation.controller.js";

const routerOrg = new Router();

routerOrg.get("/organisation/:id", getOrganisationByUser);
routerOrg.post("/organisation", createOrganisation);
routerOrg.delete("/organisation/:id");
routerOrg.post("/organisation-add-user", addUserToOrganisation);
routerOrg.delete("/organisation", deleteUserFromOrganisation);
export default routerOrg;
