import UserModel from '../database/models/User.model';

class UserService {
  public userModel = UserModel;

  public async getByUsername(username: string) {
    const user = await this.userModel.findOne({ where: { username } });
    
    return user;
  }

  // CRIADO PARA TESTAR HASH DA SENHA

  // public async createUser(body: any) {
  //   const user = await this.userModel.create(body);
    
  //   return user;
  // }
}

export default UserService;