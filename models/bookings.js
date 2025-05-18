const Sequelize = require('sequelize');
const sequelize = require('../database/connection');
const userModel = require('./users');

const booking = sequelize.define('tbl_bookings', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    memberId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    sessionSlotId: {
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

booking.belongsTo(userModel, { foreignKey: 'memberId', as: 'member' });
userModel.hasMany(booking, { foreignKey: 'memberId' })

module.exports = booking;
