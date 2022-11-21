module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        username: 'User1',
        password: '$2a$10$.94vNa/vu2TvtDwfhjUF1u76BKrouu4A9EizN/Y/ebD2OdVmjTCyC',
        accountId: 1
          // senha: secret_User1
      },
      {
        username: 'User2',
        password: '$2a$10$l729CAXugzoQ5evWIV9LweNpusDE3yYvVy07wKmy4ZCgDnXYHTMVa',
        accountId: 2
          // senha: secret_User2
      },
      {
        username: 'User3',
        password: '$2a$10$wFmdxSP2CF6dct1KP/AMcO0UbosFXdXoahQWfyVBew/rrYPH3k9Sq',
        accountId: 3
          // senha: secret_User3
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
