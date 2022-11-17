import AccountModel from '../database/models/Account.model';
import TransactionModel from '../database/models/Transaction.model';
import ITransaction from '../interfaces/ITransaction';

class TransactionService {
  public transactionModel = TransactionModel;

  create() {
    this.transactionModel.create()
  }

  public async createTransaction(body: ITransaction): Promise<ITransaction> {
    const transaction =  await this.transactionModel.create({...body});

    return transaction;
  }

  public async getTransactions(debitedAccountId: number): Promise<ITransaction[]> {
    const transactions = await this.transactionModel.findAll({
       where: { debitedAccountId },
       include: [{
        model: AccountModel,
        as: 'debitedAccount',
        attributes: ['balance'],
      },
      {
        model: AccountModel,
        as: 'creditedAccount',
        attributes: ['balance'],
      },
      ],
      });

    return transactions;
  }
}


export default TransactionService;
