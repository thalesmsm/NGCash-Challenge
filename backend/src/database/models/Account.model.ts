import { Model, INTEGER } from 'sequelize';
import db from '.';

class AccountModel extends Model {
  declare id: number;
  declare balance: number;
}

AccountModel.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
