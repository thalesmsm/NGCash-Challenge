import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import AccountModel from './Account.model';

class UserModel extends Model {
  declare id: number;
  declare username: string;
  declare password: string;
  declare accountId: number;
}

UserModel.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    accountId: {
      type: INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize: db,
    modelName: 'UserModel',
    tableName: 'users',
    timestamps: false,
  },
);

UserModel.belongsTo(AccountModel, { foreignKey: 'accountId', as: 'account' });

export default UserModel;
