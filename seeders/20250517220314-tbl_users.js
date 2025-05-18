'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tbl_users', [
      {
        name: 'Saurabh Singh',
        email: 'saurabh@gmail.com',
        password: '2e5581462d636ab23c59a335d939cc6bb4ea90b22de2309af04c98fa4dd249cd', // password: saurabh@123
        wallet: 0,
        roleId: 1,
        status: 1,
        isDeleted: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tbl_users', null, {});
  },
};

