import {
  createDocumentService,
  deleteDocumentService,
  getDocumentByIdService,
  getDocumentsService,
  updateDocumentService,
} from "../services/documents.service.js";

export const getDocuments = async (req, res) => {
  try {
    const getDocument = await getDocumentsService(req.params.id);
    if (getDocument) res.status(200).json(getDocument);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getDocumentById = async (req, res) => {
  try {
    const getDocumentById = await getDocumentByIdService(req.params.id);
    if (getDocumentById) res.status(200).json(getDocumentById);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const createDocument = async (req, res) => {
  try {
    const createDocument = await createDocumentService(req.body);
    if (createDocument) res.status(200).json("Create document success");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateDocument = async (req, res) => {
  try {
    const updateDocument = await updateDocumentService(req.body, req.params.id);
    if (updateDocument) res.status(200).json("Update document success");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const deleteDocument = await deleteDocumentService(req.params.id);
    if (deleteDocument) res.status(200).json("Delete document success");
  } catch (error) {
    res.status(500).json(error);
  }
};
