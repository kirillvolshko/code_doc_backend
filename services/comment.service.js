import { AppDataSource } from "../config/data-source.js";
import { Document } from "../entities/Documents.js";
import { Comment } from "../entities/Comments.js";
import ApiError from "../exceptions/api-error.js";
import { creatorDto } from "../dtos/user-dto.js";
import { commentDto } from "../dtos/comment-dto.js";
import { User } from "../entities/User.js";
import { In } from "typeorm";

const documentRepository = AppDataSource.getRepository(Document);
const commentRepository = AppDataSource.getRepository(Comment);
const userRepository = AppDataSource.getRepository(User);

export const getCommentService = async (id) => {
  const findDocument = await documentRepository.findBy({ id });
  if (!findDocument) {
    throw ApiError.BadRequest("Dont find this comment by doc_id");
  }

  const comments = await commentRepository.findBy({ doc_id: id });

  const creatorIds = [...new Set(comments.map((c) => c.creator_id))];

  const users = await userRepository.findBy({ id: In(creatorIds) });

  const userMap = new Map();
  for (const user of users) {
    userMap.set(user.id, await creatorDto(user));
  }

  const enrichedComments = comments.map((comment) => {
    const userDto = userMap.get(comment.creator_id);
    return commentDto(comment, userDto);
  });

  return enrichedComments;
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
  const { content } = body;
  console.log(content);
  console.log(id);
  const findComment = await commentRepository.findOneBy({ id: id });
  console.log(findComment);
  if (!findComment) {
    throw ApiError.BadRequest("Dont find this comment by id");
  }
  console.log(findComment);
  const updateComment = await commentRepository.update(id, {
    content: content,
  });
  console.log(updateComment);
  return updateComment;
};

export const deleteCommentService = async (id) => {
  const deleteComment = await commentRepository.delete(id);
  return deleteComment;
};
