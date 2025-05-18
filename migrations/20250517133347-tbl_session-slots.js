'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_session_slots', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      trainerId: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      sessionStartTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      sessionEndTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      isBooked: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      status: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 1,
      },
      isDeleted: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_session_slots');
  }
};