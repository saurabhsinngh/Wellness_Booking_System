const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const role = sequelize.define('tbl_roles', {
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false,
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

module.exports = role;
