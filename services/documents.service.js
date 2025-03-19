import { AppDataSource } from "../config/data-source.js";
import db from "../config/db.js";
import { Document } from "../entities/Documents.js";
import { User } from "../entities/User.js";
import ApiError from "../exceptions/api-error.js";
import { documentDto } from "../dtos/document-dto.js";
import { creatorDto } from "../dtos/user-dto.js";

const documentRepository = AppDataSource.getRepository(Document);
const userRepository = AppDataSource.getRepository(User);

export const getDocumentsService = async (id) => {
  const getDocument = await documentRepository.findOneBy({ org_id: id });

  if (!getDocument) {
    throw ApiError.BadRequest("No documents in this org");
  }

  const getUser = await userRepository.findOneBy({
    id: getDocument.creator_id,
  });

  const userDtoInstance = await creatorDto(getUser);

  const document = await documentDto(getDocument, userDtoInstance);

  return [document];
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
  const updateDocument = await db.query(
    `UPDATE code_document set title = $1, 
         content = $2, 
         updated_id = $3, 
         updated_at = $4 
     WHERE id = $5 `,
    [title, content, updated_id, updatedAt, id]
  );
  return updateDocument;
};

export const deleteDocumentService = async (id) => {
  const deleteDocument = await db.query(
    `DELETE FROM code_document where id=$1`,
    [id]
  );
  return deleteDocument;
};
