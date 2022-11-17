import { NextFunction, Request, Response } from 'express';
import ITransaction from '../interfaces/ITransaction';
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

    if (debitedAccount.id === body.creditedAccountId) return res.status(401).json({ message: 'Transaction Unauthorized'});
    if (body.value > debitedAccount.balance) return res.status(401).json({ message: 'Insufficient funds' });

    try {
      const newTransaction = await this.transactionService.createTransaction(transaction);
      await this.accountService.updateAccount({...debitedAccount, balance: debitedAccountBalance}, body.debitedAccountId);
      await this.accountService.updateAccount({...creditedAccount, balance: creditedAccountBalance}, body.creditedAccountId);
      return res.status(201).json(newTransaction);
    } catch (error) {
      next(error);
    }
  }

  public getTransactions = async (req: Request, res: Response) => {
    const {id} = req.params;
    const transactions = await this.transactionService.getTransactions(Number(id));

    return res.status(200).json(transactions);
  }
}

export default TransactionController;
