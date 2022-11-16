import { NextFunction, Request, Response } from 'express';
import ITransaction from '../Interfaces/ITransaction';
import AccountService from '../services/Account.service';
import TransactionService from '../services/Transaction.service';

class TransactionController {
  transactionService: TransactionService;
  accountService: AccountService;

  constructor() {
    this.transactionService = new TransactionService();
    this.accountService = new AccountService();
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const transaction: ITransaction = {
      debitedAccountId: body.debitedAccountId,
      creditedAccountId: body.creditedAccountId,
      value: body.value,
      createdAt: new Date,
    };
    
    const debitedAccount = await this.accountService.getAccountById(Number(body.debitedAccountId));
    const debitedAccountBalance = debitedAccount.balance - body.value;
    
    const creditedAccount = await this.accountService.getAccountById(Number(body.creditedAccountId));
    const creditedAccountBalance = creditedAccount.balance + body.value;

    try {
      const newTransaction = await this.transactionService.createTransaction(transaction);
      await this.accountService.updateAccount({...debitedAccount, balance: debitedAccountBalance}, body.debitedAccountId);
      await this.accountService.updateAccount({...creditedAccount, balance: creditedAccountBalance}, body.creditedAccountId);
      return res.status(201).json(newTransaction);
    } catch (error) {
      next(error);
    }
  }
}

export default TransactionController;
