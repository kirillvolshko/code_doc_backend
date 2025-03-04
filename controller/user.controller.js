import { createUserService } from "../services/user.service.js";

export const createUser = async (req, res) => {
  try {
    const user = await createUserService(req.body);
    if (user) res.status(200).json("Create user success");
  } catch (error) {
    res.status(500).json(error);
  }
};
