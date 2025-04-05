import ApiError from "../exceptions/api-error.js";
import { validateAccessToken } from "../services/token.service.js";

export default function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw ApiError.UnauthorizesError;
    }
    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
      throw ApiError.UnauthorizesError;
    }
    const userData = validateAccessToken(accessToken);
    if (!userData) {
      throw ApiError.UnauthorizesError;
    }

    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.UnauthorizesError);
  }
}
