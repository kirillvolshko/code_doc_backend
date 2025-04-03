import Router from "express";
import {
  createDocument,
  deleteDocument,
  getDocuments,
  updateDocument,
} from "../controller/documents.controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const routerDoc = new Router();

routerDoc.get("/documents-code/:id", authMiddleware, getDocuments);
routerDoc.post("/documents-code", authMiddleware, createDocument);
routerDoc.patch("/documents-code/:id", authMiddleware, updateDocument);
routerDoc.delete("/documents-code/:id", authMiddleware, deleteDocument);

export default routerDoc;
