import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AuthRequest } from '../types/authRequest';

export function JwtAuthenticate(
  request: AuthRequest,
  response: Response,
  next: NextFunction,
): void {
  const header = request.headers.authorization;

  if (!header) {
    response.status(401).send('Access token not found');
    return;
  }

  const [, token] = header.split(' ');

  try {
    const decoded = verify(token, process.env.JWT_TOKEN || '') as {
      id: string;
    };

    request.user = {
      id: decoded.id,
    };

    return next();
  } catch (error) {
    response.status(401).send('Unauthorized');
  }
}
