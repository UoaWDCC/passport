import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export default function authRequired(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader: string | undefined = req.header('Authorization');

  const token: string | undefined = authHeader?.slice(7);
  if (!token) return res.status(400).send('Unauthorized');

  const JWT_SECRET = process.env.JWT_SECRET!;

  verify(token!, JWT_SECRET, (err: any, { email }: any) => {
    if (err) return res.status(400).send('Invalid Token');
    req.body.user = {
      email,
    };
  });

  return next();
}

export function authOptional(req: Request, res: Response, next: NextFunction) {
  const authHeader: string | undefined = req.header('Authorization');

  const token: string | undefined = authHeader?.slice(7);
  if (!token) return next();

  const JWT_SECRET = process.env.JWT_SECRET!;

  verify(token!, JWT_SECRET, (err: any, { email }: any) => {
    if (err) return next();
    req.body.user = {
      email,
    };
  });

  return next();
}
