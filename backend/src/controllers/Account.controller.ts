import { Request, Response } from 'express';
import AccountService from '../services/Account.service';
import UserService from '../services/User.service';
import decodeToken from '../utils/tokenManipulation';

export default class AccountController {
  accountService: AccountService;
  userService: UserService;

  constructor() {
    this.accountService = new AccountService();
    this.userService = new UserService();
  }

  getAccount = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { authorization } = req.headers;
    const { username } = decodeToken(authorization as string);
    const userLogged = await this.userService.getByUsername(username);

    const account = await this.accountService.getAccountById(Number(id));   

    if (userLogged && userLogged.accountId === Number(id)) {
      return res.status(200).json({balance: account?.balance});
    }
    
   return res.status(401).json({message: 'Unauthorized'});
  }
}