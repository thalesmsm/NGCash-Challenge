import AccountModel from '../database/models/Account.model';

class AccountService {
  public accountModel = AccountModel;

  public async getAllAccounts() {
    const accounts = await this.accountModel.findAll();
    
    return accounts;
  }


  public async createAccount(id: number, balance: number) {
    
    const account = await this.accountModel.create({id, balance});
    
    return account;
  }
}

export default AccountService;