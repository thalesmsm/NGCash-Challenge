import { NextFunction, Request, Response } from 'express';
import ITransaction from '../Interfaces/ITransaction';
import TransactionService from '../services/Transaction.service';

class TransactionController {
  transactionService: TransactionService;

  constructor() {
    this.transactionService = new TransactionService();
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const transaction: ITransaction = {
      debitedAccountId: body.debitedAccountId,
      creditedAccountId: body.creditedAccountId,
      value: body.value,
      createdAt: new Date,
    };
    console.log(transaction);
    
    try {
      const newTransaction = await this.transactionService.createTransaction(transaction);
      return res.status(201).json(newTransaction);
    } catch (error) {
      next(error);
    }
  }
}

export default TransactionController;
