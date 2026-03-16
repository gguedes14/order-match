import { Request, Response } from "express";
import { UsersService } from "../service/usersService";
import { AppError } from '../errors/apiError';

export class UsersController {
  static async createUser(req: Request, res: Response) {
    const { username } = req.body;

    try {
      const user = await UsersService.createUser({ username });

      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          message: error.message,
        });
      }
    }
  }
}
