import db from "../config/db.js";

export const createUserService = async (body) => {
  const { name, email, password } = body;
  const createUser = await db.query(
    `INSERT INTO users (name, email, password) values ($1, $2, $3)`,
    [name, email, password]
  );
  return createUser;
};
