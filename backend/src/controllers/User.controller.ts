import { Request, Response } from 'express';
import AccountService from '../services/Account.service';
import UserService from '../services/User.service';

export default class UserController {
  userService: UserService;
  accountService: AccountService;

  constructor() {
    this.userService = new UserService();
    this.accountService = new AccountService();
  }

  createUser = async (req: Request, res: Response) => {
    const { body } = req;
    const { username, password } = body;
    const users = await this.userService.getAllUsers();
    let accountId = 0;

    if (users.length === 0) {
      accountId = 1;
    } else {
      const lastUser = users[users.length - 1];
      accountId = lastUser.accountId + 1;
    }
    
    const validPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    
    if (username.length < 3) return res.status(201).json({message: 'Username must be at least 3 characters'});
    
    if (!validPassword.test(password)) {
      return res.status(401).json({ 
        message: 'Password must be minimum 8 characters, at least 1 uppercase letter and 1 number' 
      });
    }

    await this.userService.createUser(username, password, accountId);

    await this.accountService.createAccount(accountId, 100);
    
    return res.status(201).json({
      message: 'User created',
      body: {
        username,
        password,
        accountId
      }
    });
  }

  getAllUsers = async (req: Request, res: Response) => {
    const users = await this.userService.getAllUsers();

    return res.status(200).json(users)
  }
}