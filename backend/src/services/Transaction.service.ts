import TransactionModel from '../database/models/Transaction.model';
// import Transaction from '../Domain/Transaction';
import ITransaction from '../Interfaces/ITransaction';

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
