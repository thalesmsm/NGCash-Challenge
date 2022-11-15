import { Model, INTEGER, STRING, CreateOptions, UpdateOptions } from 'sequelize';
import { genSalt, hash } from 'bcryptjs';
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
    hooks: {
      beforeCreate: async (user, options: CreateOptions) => {
        const salt = await genSalt()
        user.password = await hash(user.password, salt)
      },
      // beforeUpdate: async (user, options: UpdateOptions) => {
      //   if (user.changed('password')) {
      //     const salt = await genSalt()
      //     user.password = await hash(user.password, salt)
      //   }
      // }
    }
  },
);

UserModel.belongsTo(AccountModel, { foreignKey: 'accountId', as: 'account' });

export default UserModel;
