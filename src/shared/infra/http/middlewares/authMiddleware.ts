import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';

import config from '@config/config';
import { UserType } from '@shared/infra/http/types/custom';

interface ITokenPayload {
  iat: number,
  exp: number,
  user: UserType
}

export default function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (authHeader && authHeader !== "null") {
    if (!authHeader) {
      throw new AppError('JWT token is missing', 401);
    }

    const [scheme, token]  = authHeader.split(' ');

    if (!/^Bearer$/i.test(scheme)) {
      throw new AppError('Token malformed!', 401);
    }

    try {
      const decoded = verify(token, config.jwt.secret);

      const { user  } = decoded as ITokenPayload;

      request.user = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      return next();
    } catch {
      throw new AppError('Access Unauthorized!', 401);
    }
  } else {
    throw new AppError('Access Unauthorized!', 401);
  }
}
