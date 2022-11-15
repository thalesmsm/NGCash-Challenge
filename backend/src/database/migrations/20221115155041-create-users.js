'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: { 
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false, 
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      accountId: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('users');
  }
};
