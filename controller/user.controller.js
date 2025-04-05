import { validationResult } from "express-validator";
import {
  createUserService,
  loginUserService,
  logoutUserService,
  refreshUserService,
} from "../services/user.service.js";
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
    const loginUser = await loginUserService(req.body);
    if (loginUser) {
      res.cookie("refreshToken", loginUser.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json(loginUser);
    }
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    await logoutUserService(refreshToken);
    res.clearCookie("refreshToken");
    return res.status(200).json("Logout success");
  } catch (error) {
    next(error);
  }
};

export const refreshUser = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const user = await refreshUserService(refreshToken);
    res.cookie("refreshToken", user.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
