import { Model, INTEGER, DATE } from 'sequelize';
import db from '.';
import AccountModel from './Account.model';

class TransactionModel extends Model {
  declare id: number;
  declare value: number;
  declare debitedAccountId: number;
  declare creditedAccountId: number;
  declare createdAt: Date;
}

TransactionModel.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    value: {
      type: INTEGER,
      allowNull: false,
    },
    debitedAccountId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: 'AccountModel',
        key: 'id',
      },
    },
    creditedAccountId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: 'AccountModel',
        key: 'id',
      },
    }
    ,
    createdAt: {
      type: DATE,
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: 'TransactionModel',
    tableName: 'transactions',
    timestamps: false,
  },
);

TransactionModel.belongsTo(AccountModel, { foreignKey: 'debitedAccountId', as: 'debitedAccount' });
TransactionModel.belongsTo(AccountModel, { foreignKey: 'creditedAccountId', as: 'creditedAccount' });

export default TransactionModel;
