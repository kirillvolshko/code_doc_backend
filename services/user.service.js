import bcrypt from "bcrypt";
import { userDto } from "../dtos/user-dto.js";
import { generateTokent, saveToken } from "./token.service.js";
import ApiError from "../exceptions/api-error.js";
import { User } from "../entities/User.js";
import { AppDataSource } from "../config/data-source.js";

export const createUserService = async (body) => {
  const { name, email, password } = body;
  const userRepository = AppDataSource.getRepository(User);
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

export const loginUserService = async (body) => {};
