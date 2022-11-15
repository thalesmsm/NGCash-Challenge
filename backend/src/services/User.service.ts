import UserModel from '../database/models/User.model';

class UserService {
  public userModel = UserModel;

  public async getAllUsers() {
    const users = await this.userModel.findAll();
    
    return users;
  }

  public async getByUsername(username: string) {
    const user = await this.userModel.findOne({ where: { username } });
    
    return user;
  }

  public async createUser(username: string, password: string, accountId: number) {
    
    const user = await this.userModel.create({username, password, accountId});
    
    return user;
  }
}

export default UserService;