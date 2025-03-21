import { AppDataSource } from "../config/data-source.js";
import { Document } from "../entities/Documents.js";
import { Comment } from "../entities/Comments.js";
import ApiError from "../exceptions/api-error.js";

const documentRepository = AppDataSource.getRepository(Document);
const commentRepository = AppDataSource.getRepository(Comment);

export const createCommentService = async (body) => {
  const { creator_id, content, doc_id } = body;

  const findDocument = await documentRepository.findOneBy({ id: doc_id });
  if (!findDocument) {
    throw ApiError.BadRequest("Dont find this document by doc_id");
  }
  const createComment = commentRepository.create({
    creator_id: creator_id,
    content: content,
    doc_id: doc_id,
  });
  const saveComment = await commentRepository.save(createComment);

  return saveComment;
};
