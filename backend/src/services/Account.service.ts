import AccountModel from '../database/models/Account.model';
import IAccount from '../interfaces/IAccount';

class AccountService {
  public accountModel = AccountModel;

  public async getAllAccounts(): Promise<IAccount[]> {
    const accounts = await this.accountModel.findAll();
    
    return accounts;
  }

  public async getAccountById(id: number): Promise<IAccount> {
    const account = await this.accountModel.findOne({ where: { id } });
    
    return account as IAccount;
  }


  public async createAccount(id: number, balance: number): Promise<IAccount> {
    const account = await this.accountModel.create({id, balance});
    
    return account;
  }

  public async updateAccount(body: IAccount, id: number): Promise<Object> {
    await this.accountModel.update(body, { where: { id } });
    return { message: 'Transaction success' };
  }
}

export default AccountService;