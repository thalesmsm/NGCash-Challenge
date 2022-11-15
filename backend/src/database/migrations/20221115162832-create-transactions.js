'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: { 
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false, 
        primaryKey: true
      },
      value: {
        type: Sequelize.INTEGER,
        allowNull: false 
      },
      debitedAccountId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      creditedAccountId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};
