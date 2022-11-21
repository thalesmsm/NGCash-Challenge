module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('accounts', [
      {
        id: 1,
        balance: 100
      },
      {
        id: 2,
        balance: 100
      },
      {
        id: 3,
        balance: 100
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('accounts', null, {});
  },
};
