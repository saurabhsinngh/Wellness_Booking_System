const Sequelize = require('sequelize');
const sequelize = require('../database/connection');
const booking = require('./bookings');

const sessionSlot = sequelize.define('tbl_session_slots', {
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

sessionSlot.hasMany(booking, { foreignKey: 'sessionSlotId' });
booking.belongsTo(sessionSlot, { foreignKey: 'sessionSlotId' });

module.exports = sessionSlot;
