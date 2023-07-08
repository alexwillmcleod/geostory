import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from '../db/schema';

export default async function auth(
  req: Request,
  res: Response,
  next: Function
) {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send('`email` and `password` are required fields');

  const foundUser = await User.findOne({ email, password });
  if (!foundUser)
    return res.status(400).send('`email` or `password` is incorrect');

  req.body.user = foundUser;
  return next();
}

export async function maybeAuth(req: Request, res: Response, next: Function) {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send('`email` and `password` are required fields');

  const foundUser = await User.findOne({ email, password });
  req.body.user = foundUser;
  return next();
}
