import {
  createCommentService,
  getCommentService,
} from "../services/comment.service.js";

export const getComment = async (req, res) => {
  const getComment = await getCommentService(req.params.id);
  if (getComment) res.status(200).json(getComment);
  try {
  } catch (error) {
    res.status(500).json(error);
  }
};
export const editComment = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json(error);
  }
};
export const createComment = async (req, res) => {
  try {
    const createComment = await createCommentService(req.body);
    if (createComment) {
      res.status(200).json("Create comment success");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
export const deleteComment = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json(error);
  }
};
