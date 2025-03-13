import db from "../config/db.js";
import jwt from "jsonwebtoken";

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
  const tokenData = await db.query(`SELECT * FROM token where user_id=$1`, [
    id,
  ]);
  if (tokenData.rows.length > 0) {
    const id = tokenData.rows[0].user_id;
    const updateToken = await db.query(
      `UPDATE token set refreshToken=$1 WHERE user_id=$2`,
      [refreshToken, id]
    );
    return updateToken;
  }
  const saveToken = await db.query(
    `INSERT INTO token(user_id, refreshToken) VALUES ($1, $2) RETURNING *`,
    [id, refreshToken]
  );
  return saveToken;
};
