import bcrypt from "bcrypt";
import { userDto } from "../dtos/user-dto.js";
import {
  generateTokent,
  saveToken,
  removeToken,
  validateRefreshToken,
  findToken,
} from "./token.service.js";
import ApiError from "../exceptions/api-error.js";
import { User } from "../entities/User.js";
import { AppDataSource } from "../config/data-source.js";

const userRepository = AppDataSource.getRepository(User);

export const createUserService = async (body) => {
  const { name, email, password } = body;

  const user = await userRepository.findOneBy({ email: email });

  if (user) {
    throw ApiError.BadRequest(
      "A user with email " + email + " already exists."
    );
  }

  const hashPassword = await bcrypt.hash(password, 3);

  const createUser = userRepository.create({
    name: name,
    email: email,
    password: hashPassword,
  });

  await userRepository.save(createUser);
  const userDtoInstance = userDto(createUser);

  const tokens = await generateTokent(userDtoInstance);
  await saveToken(userDtoInstance.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDtoInstance,
  };
};

export const loginUserService = async (body) => {
  const { email, password } = body;

  const user = await userRepository.findOneBy({ email: email });

  if (!user) {
    throw ApiError.BadRequest("User dont find");
  }
  const isPassEquals = await bcrypt.compare(password, user.password);
  if (!isPassEquals) {
    throw ApiError.BadRequest("Wrong password");
  }
  const userDtoInstance = userDto(user);
  const tokens = await generateTokent(userDtoInstance);

  await saveToken(userDtoInstance.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDtoInstance,
  };
};

export const logoutUserService = async (refreshToken) => {
  console.log(refreshToken);
  const token = await removeToken(refreshToken);
  console.log(token);
  return token;
};

export const refreshUserService = async (refreshToken) => {
  if (!refreshToken) {
    throw ApiError.UnauthorizesError();
  }
  const userData = await validateRefreshToken(refreshToken);
  const tokenFromDb = await findToken(refreshToken);

  if (!userData || !tokenFromDb) {
    throw ApiError.UnauthorizesError();
  }
  const user = await userRepository.findOneBy({ id: userData.id });
  const userDtoInstance = userDto(user);
  const tokens = await generateTokent(userDtoInstance);

  await saveToken(userDtoInstance.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDtoInstance,
  };
};
