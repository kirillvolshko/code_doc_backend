import { AppDataSource } from "../config/data-source.js";
import db from "../config/db.js";
import { Document } from "../entities/Documents.js";
import { User } from "../entities/User.js";
import ApiError from "../exceptions/api-error.js";
import { documentDto } from "../dtos/document-dto.js";
import { creatorDto } from "../dtos/user-dto.js";
import { In } from "typeorm";

const documentRepository = AppDataSource.getRepository(Document);
const userRepository = AppDataSource.getRepository(User);

export const getDocumentsService = async (id) => {
  const getDocument = await documentRepository.findBy({ org_id: id });
  if (!getDocument) {
    throw ApiError.BadRequest("No documents in this org");
  }
  const documents = getDocument.map((item) => item.creator_id);
  const getUser = await userRepository.findBy({
    id: In(documents),
  });
  const userDtoInstance = await getUser.map((item) => creatorDto(item));
  const document = getDocument.map((doc) => {
    const creator = userDtoInstance.find((user) => user.id === doc.creator_id);
    return documentDto(doc, creator);
  });

  return document;
};

export const getDocumentByIdService = async (id) => {
  const getDocument = await documentRepository.findOneBy({ id: id });
  if (!getDocument) {
    throw ApiError.BadRequest("Error in id");
  }
  const getUser = await userRepository.findBy({
    id: getDocument.creator_id,
  });
  const userDtoInstance = await creatorDto(getUser);
  const document = await documentDto(getDocument, userDtoInstance);
  return document;
};

export const createDocumentService = async (body) => {
  const { title, content, creator_id, org_id } = body;
  const createDocument = documentRepository.create({
    title: title,
    content: content,
    creator_id: creator_id,
    org_id: org_id,
  });
  const saveDocument = documentRepository.save(createDocument);
  return saveDocument;
};

export const updateDocumentService = async (body, id) => {
  const { title, content, updated_id } = body;
  const updatedAt = new Date();
  const findDocument = await documentRepository.findOneBy({ id: id });
  if (!findDocument) {
    throw ApiError.BadRequest("Dont have document with this id");
  }
  const updateDocument = documentRepository.update(id, {
    title: title,
    content: content,
    updated_id: updated_id,
    updated_at: updatedAt,
  });

  return updateDocument;
};

export const deleteDocumentService = async (id) => {
  const findDocument = await documentRepository.findOneBy({ id: id });
  if (!findDocument) {
    throw ApiError.BadRequest("Dont have document with this id");
  }
  const deleteDocument = await documentRepository.delete({ id: id });
  return deleteDocument;
};
