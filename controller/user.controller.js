import { validationResult } from "express-validator";
import { createUserService } from "../services/user.service.js";
import ApiError from "../exceptions/api-error.js";

export const createUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Validation error", errors.array()));
    }
    const user = await createUserService(req.body);
    if (user) {
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
