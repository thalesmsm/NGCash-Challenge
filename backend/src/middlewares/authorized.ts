import { NextFunction, Request, Response } from 'express';
import decodeToken from '../utils/tokenManipulation';

export default function authorizate(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;

  if (!authorization) return response.status(401).json({ message: 'Token must be a valid token' });

  try {
    decodeToken(authorization);
  } catch {
    return response.status(401).json({ message: 'Token must be a valid token' });
  }

  next();
}