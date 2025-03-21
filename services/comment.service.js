import { AppDataSource } from "../config/data-source.js";
import { Document } from "../entities/Documents.js";
import { Comment } from "../entities/Comments.js";
import ApiError from "../exceptions/api-error.js";
import { creatorDto } from "../dtos/user-dto.js";
import { commentDto } from "../dtos/comment-dto.js";
import { User } from "../entities/User.js";

const documentRepository = AppDataSource.getRepository(Document);
const commentRepository = AppDataSource.getRepository(Comment);
const userRepository = AppDataSource.getRepository(User);

export const getCommentService = async (id) => {
  const findDocument = await documentRepository.findOneBy({ id: id });
  if (!findDocument) {
    throw ApiError.BadRequest("Dont find this comment by doc_id");
  }

  const getComment = await commentRepository.find({ doc_id: id });
  const getUser = await userRepository.findOneBy({
    id: getComment.creator_id,
  });

  const userDtoInstance = await creatorDto(getUser);
  const comments = getComment.map((comment) =>
    commentDto(comment, userDtoInstance)
  );

  return comments;
};

export const createCommentService = async (body) => {
  const { creator_id, content, doc_id } = body;

  const findDocument = await documentRepository.findOneBy({ id: doc_id });
  if (!findDocument) {
    throw ApiError.BadRequest("Dont find this comment by doc_id");
  }
  const createComment = commentRepository.create({
    creator_id: creator_id,
    content: content,
    doc_id: doc_id,
  });
  const saveComment = await commentRepository.save(createComment);

  return saveComment;
};

export const updateCommentService = async (body, id) => {
  const { creator_id, content, doc_id } = body;
  console.log(body);
  console.log(id);
  const findComment = await commentRepository.findOneBy({ id: id });
  if (!findComment) {
    throw ApiError.BadRequest("Dont find this comment by id");
  }

  const updateComment = commentRepository.update(id, {
    creator_id: creator_id,
    content: content,
    doc_id: doc_id,
  });
  console.log(updateComment);
  return updateComment;
};
