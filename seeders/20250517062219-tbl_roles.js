'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('tbl_roles', [
      {
        name: 'member',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'trainer',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tbl_roles', null, {});
  },
};
