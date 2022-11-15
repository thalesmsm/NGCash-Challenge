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

    await this.userService.createUser(username, password, accountId);

    res.status(201).json({
      message: 'User created',
      body: {
        username,
        password,
        accountId
      }
    })
  }
}