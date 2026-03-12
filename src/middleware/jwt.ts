import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../errors/apiError';

export function JwtAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const header = request.headers.authorization;

  if (!header) {
    response.status(401).send('Access token not found');
    return
  }

  const [, token] = header.split(' ');

  try {
    verify(token, process.env.JWT_TOKEN || '');

    return next();
  } catch(error) {
    if (error instanceof AppError) {
      response.status(401).send('Unauthorized');
    }
  }
}
