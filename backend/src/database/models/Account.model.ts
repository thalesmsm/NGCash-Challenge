import { Model, INTEGER } from 'sequelize';
import db from '.';
import IAccount from '../../interfaces/IAccount';

class AccountModel extends Model<IAccount> {
  declare id: number;
  declare balance: number;
}

AccountModel.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    balance: {
      type: INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize: db,
    modelName: 'AccountModel',
    tableName: 'accounts',
    timestamps: false,
  },
);

export default AccountModel;
