import UserModel from '../database/models/User.model';
import IUser from '../interfaces/IUser';

class UserService {
  public userModel = UserModel;

  public async getAllUsers(): Promise<IUser[]> {
    const users = await this.userModel.findAll();
    
    return users;
  }

  public async getByUsername(username: string): Promise<IUser> {
    const user = await this.userModel.findOne({ where: { username } });
    
    return user as IUser;
  }

  public async createUser(username: string, password: string, accountId: number): Promise<IUser> {
    
    const user = await this.userModel.create({username, password, accountId});
    
    return user;
  }
}

export default UserService;