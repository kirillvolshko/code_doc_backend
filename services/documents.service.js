import { AppDataSource } from "../config/data-source.js";
import { Document } from "../entities/Documents.js";
import { User } from "../entities/User.js";
import ApiError from "../exceptions/api-error.js";
import { documentDto, documentsDto } from "../dtos/document-dto.js";
import { creatorDto } from "../dtos/user-dto.js";

const documentRepository = AppDataSource.getRepository(Document);
const userRepository = AppDataSource.getRepository(User);

export const getDocumentsService = async (id) => {
  const getDocument = await documentRepository.findBy({ project_id: id });
  if (!getDocument) {
    throw ApiError.BadRequest("No documents in this org");
  }

  const document = getDocument.map((doc) => documentsDto(doc));

  return document;
};

export const getDocumentByIdService = async (id) => {
  const getDocument = await documentRepository.findOneBy({ id });
  if (!getDocument) {
    throw ApiError.BadRequest("Error in id");
  }

  const getUser = await userRepository.findOneBy({
    id: getDocument.creator_id,
  });

  let editor = null;

  if (getDocument.updated_id) {
    const editorUser = await userRepository.findOneBy({
      id: getDocument.updated_id,
    });

    if (editorUser) {
      editor = await creatorDto(editorUser);
    }
  }

  const userDtoInstance = await creatorDto(getUser);
  const document = await documentDto(getDocument, userDtoInstance, editor);

  return document;
};

export const createDocumentService = async (body) => {
  const { title, content, creator_id, project_id } = body;
  const createDocument = documentRepository.create({
    title: title,
    content: content,
    creator_id: creator_id,
    project_id: project_id,
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

// export const getDocumentsService = async (id) => {
//   const getDocument = await documentRepository.findBy({ project_id: id });
//   if (!getDocument) {
//     throw ApiError.BadRequest("No documents in this org");
//   }
//   const documents = getDocument.map((item) => item.creator_id);
//   const getUser = await userRepository.findBy({
//     id: In(documents),
//   });
//   const userDtoInstance = await getUser.map((item) => creatorDto(item));
//   const document = getDocument.map((doc) => {
//     const creator = userDtoInstance.find((user) => user.id === doc.creator_id);
//     return documentDto(doc, creator);
//   });

//   return document;
// };
