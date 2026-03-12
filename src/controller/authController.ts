import { Request, Response } from 'express';
import { AuthService } from '../service/authService';
import { AppError } from '../errors/apiError';

export class AuthController {
  static async authenticate(req: Request, res: Response) {
    const { username } = req.body;

    try {
      const login = await AuthService.login(username);

      res.status(200).send(login);
    } catch (error){
       if (error instanceof AppError) {
        res.status(401).send({ message: error.message });
       }
    }
  }
}
