const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const users = sequelize.define('tbl_users', {
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    wallet: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    roleId: {
        type: Sequelize.INTEGER,
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

module.exports = users;
