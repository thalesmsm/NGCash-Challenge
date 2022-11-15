import { Request, Response } from 'express';
import UserService from '../services/User.service';

export default class UserController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  createUser = async (req: Request, res: Response) => {
    const { body } = req;
    const { username, password, accountId } = body; 

    const validPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-zA-Z]).{7,}$/;

    if (!validPassword.test(password)) {
      return res.status(401).json({ 
        message: 'Password must be minimum eight characters, at least one uppercase letter and one number' 
      });
    }

    await this.userService.createUser(username, password, accountId);

    return res.status(201).json({
      message: 'User created',
      body: {
        username,
        password,
        accountId
      }
    })
  }
}