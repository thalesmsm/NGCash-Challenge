'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('accounts', {
      id: { 
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false, 
        primaryKey: true
      },
      balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }      
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('accounts');
  }
};
