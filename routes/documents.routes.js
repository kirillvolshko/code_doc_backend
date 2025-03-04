import Router from "express";
import {
  createDocument,
  getDocument,
  getDocumentById,
  patchDocument,
  deleteDocumentById,
} from "./documentController.js";
const router = new Router();

router.post("/documents-code", createDocument);
router.get("/documents-code", getDocument);
router.get("/documents-code/:id", getDocumentById);
router.patch("/documents-code/:id", patchDocument);
router.delete("/documents-code/:id", deleteDocumentById);

export default router;
