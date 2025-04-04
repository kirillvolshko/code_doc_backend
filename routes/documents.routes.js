import Router from "express";
import {
  createDocument,
  deleteDocument,
  getDocumentById,
  getDocuments,
  updateDocument,
} from "../controller/documents.controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const routerDoc = new Router();

routerDoc.get("/documents-code/:id", authMiddleware, getDocuments);
routerDoc.get("/document-code/:id", authMiddleware, getDocumentById);
routerDoc.post("/document-code", authMiddleware, createDocument);
routerDoc.patch("/document-code/:id", authMiddleware, updateDocument);
routerDoc.delete("/document-code/:id", authMiddleware, deleteDocument);

export default routerDoc;
