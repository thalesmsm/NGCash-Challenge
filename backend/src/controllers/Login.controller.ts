import { compare } from 'bcryptjs';
import { Request, Response } from 'express';
import decodeToken, { generateToken } from '../utils/tokenManipulation';
import UserService from '../services/User.service';

const userService = new UserService();

async function login(req: Request, res: Response) {
  const { body } = req;
  const { username, password } = body;  

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  const user = await userService.getByUsername(username);

  if (!user) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  const isPasswordValid = await compare(password, user.password);
  
  if (!user || !isPasswordValid) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
  const token = generateToken(body);

  res.status(200).json({ token });
}

async function validateLogin(req: Request, res: Response) {
  const { authorization } = req.headers;

  if (authorization) {
    const { role } = decodeToken(authorization);
    return res.status(200).json({ role });
  }
  return res.status(401).json({ message: 'Unauthorized' });
}

export { login, validateLogin };
