import Router from "express";
import {
  createDocument,
  deleteDocument,
  getDocument,
  updateDocument,
} from "../controller/documents.controller.js";

const routerDoc = new Router();

routerDoc.get("/documents-code/:id", getDocument);
routerDoc.post("/documents-code", createDocument);
routerDoc.patch("/documents-code/:id", updateDocument);
routerDoc.delete("/documents-code/:id", deleteDocument);

export default routerDoc;
