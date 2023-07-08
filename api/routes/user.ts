import mongoose from 'mongoose';
import { User, userSchema } from '../db/schema';
import { Router, Request, Response } from 'express';

export const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name)
    return res.status(400).send('Missing required fields');

  if (
    (email as string).length > 32 ||
    (password as string).length > 32 ||
    (name as string).length > 32
  )
    return res
      .status(400)
      .send('Email, password, or name is longer than 32 characters');

  const foundUser = await User.findOne({ email: email as string });
  if (foundUser != null)
    return res.status(400).send('user with that email already exists');

  const user = new User();
  user.name = name;
  user.password = password;
  user.email = email;
  try {
    await user.save();
  } catch (err) {
    console.error(err);
    return res.status(400);
  }

  return res.status(200).send('successfully created account');
});
