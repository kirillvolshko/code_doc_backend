import documentCode from "./DocumentCode.js";
import {
  createDocumentService,
  getDocumentByIdService,
  patchDocumentService,
  deleteDocumentByIdService,
} from "./documentService.js";
export const createDocument = async (req, res) => {
  try {
    const document = await createDocumentService(req.body);
    res.json(document);
  } catch (e) {
    res.status(500).json(e);
  }
};
export const getDocument = async (req, res) => {
  try {
    const document = await documentCode.find();
    return res.json(document);
  } catch (e) {
    res.status(500).json(e);
  }
};
export const getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    const document = await getDocumentByIdService(id);
    return res.json(document);
  } catch (e) {
    res.status(500).json(e);
  }
};
export const patchDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const document = req.body;

    const updateDocument = await patchDocumentService(id, document);
    if (updateDocument) {
      res.status(200).json("Document update");
    } else {
      res.status(400).json("Document no found");
    }
  } catch (e) {
    res.status(500).json(e);
  }
};
export const deleteDocumentById = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteDocument = await deleteDocumentByIdService(id);
    if (deleteDocument) {
      res.status(200).json("Document delete");
    } else {
      res.status(400).json("Document no found");
    }
  } catch (e) {
    res.status(500).json(e);
  }
};
