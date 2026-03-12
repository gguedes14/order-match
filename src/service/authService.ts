import { AuthRepository } from "../repository/authRepository";
import { sign } from "jsonwebtoken";
import { AppError } from "../errors/apiError";
import { HttpStatus } from "../errors/enum/httpStatus";

export class AuthService {
  static async login(username: string) {
    const userLogin = await AuthRepository.login(username);

    if (!userLogin) {
      throw new AppError(HttpStatus.NOT_FOUND, 'User not found');
    }

    const jwtSecret = process.env.JWT_TOKEN;

    if (!jwtSecret) {
      throw new AppError(HttpStatus.CONFLICT, 'Invalid login')
    }

    const accessToken = sign({
      userName: userLogin.username
    }, jwtSecret, {
      expiresIn: 86400
    });

    return accessToken
  }
}
