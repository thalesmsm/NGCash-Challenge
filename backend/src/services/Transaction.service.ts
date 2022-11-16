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
}


export default TransactionService;
