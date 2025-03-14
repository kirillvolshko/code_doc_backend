import db from "../config/db.js";
import jwt from "jsonwebtoken";
import { Token } from "../entities/Token.js";
import { AppDataSource } from "../config/data-source.js";

const tokenRepository = AppDataSource.getRepository(Token);

export const generateTokent = async (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "30m",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
  return { accessToken, refreshToken };
};

export const saveToken = async (id, refreshToken) => {
  const tokenData = await tokenRepository.findOneBy({ user_id: id });
  if (tokenData) {
    const userId = tokenData.user_id;
    const updateToken = await tokenRepository.update(userId, {
      refreshtoken: refreshToken,
    });

    return updateToken;
  }
  const saveToken = tokenRepository.create({
    user_id: id,
    refreshtoken: refreshToken,
  });
  await tokenRepository.save(saveToken);
  return saveToken;
};

export const removeToken = async (refreshToken) => {
  const tokenData = tokenRepository.delete({ refreshtoken: refreshToken });
  return tokenData;
};

export const findToken = async (refreshToken) => {
  const tokenData = tokenRepository.findOneBy({ refreshtoken: refreshToken });
  return tokenData;
};

export const validateAccessToken = async (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return userData;
  } catch (error) {
    return null;
  }
};
export const validateRefreshToken = async (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return userData;
  } catch (error) {
    return null;
  }
};
