const sessionSlot = require('../models/sessionSlots');
const { Op } = require('sequelize');
const { STRING_CONSTANTS } = require('../constants/string');
const moment = require('moment');
const usersModel = require('../models/users');
const booking = require('../models/bookings');

class TrainerService {
    /** ***** Trainer Service: Method to Add Session ******/
    async addSessionSlot(req, res, next) {
        try {
            let payload = req.body
            const { sessionStartTime, sessionEndTime } = payload;
            const trainerId = req.decoded.id;
            if (req.decoded.roleId == 2) {
                const start = moment(sessionStartTime);
                const end = moment(sessionEndTime);

                if (!start.isBefore(end)) {
                    return res.status(400).json({ status: false, message: STRING_CONSTANTS.SESSION_START_MUST_BEFORE_ENDTIME });
                }

                if (start.isBefore(moment())) {
                    return res.status(400).json({ status: false, message: STRING_CONSTANTS.SESSION_NOT_IN_PAST });
                }

                const overlap = await sessionSlot.findOne({
                    where: {
                        trainerId,
                        isDeleted: 0,
                        [Op.or]: [
                            {
                                sessionStartTime: {
                                    [Op.lt]: end.toDate(),
                                    [Op.gte]: start.toDate(),
                                },
                            },
                            {
                                sessionEndTime: {
                                    [Op.lte]: end.toDate(),
                                    [Op.gt]: start.toDate(),
                                },
                            },
                        ],
                    },
                });

                if (overlap) {
                    return res.status(409).json({ status: false, message: STRING_CONSTANTS.SESSION_TIME_OVERLAP_EXISTING_SLOT });
                }

                let createSession = {
                    trainerId: trainerId,
                    sessionStartTime: sessionStartTime,
                    sessionEndTime: sessionEndTime
                }
                const slot = await sessionSlot.create(createSession);
                return res.status(201).json({ status: true, message: STRING_CONSTANTS.SLOT_ADDED, data: slot });
            } else {
                return res.status(403).json({ status: false, message: STRING_CONSTANTS.ONLY_TRAINERS_ADD_SLOTS });
            }
        } catch (error) {
            return res.status(error.status).json({ status: false, message: error.message });
        }
    }

    /** ***** Trainer Service: Method to Get Booking Details ******/
    async bookingDetails(req, res, next) {
        try {
            const trainerId = req.decoded.id;
            if (req.decoded.roleId !== 2) {
                return res.status(403).json({ status: false, message: STRING_CONSTANTS.ONLY_TRAINERS_VIEW_BOOKING });
            }

            const bookedSlots = await sessionSlot.findAll({
                where: {
                    trainerId,
                    isBooked: true,
                    isDeleted: 0,
                },
                include: [
                    {
                        model: booking,
                        where: { isDeleted: 0 },
                        include: [
                            {
                                model: usersModel,
                                as: 'member',
                                attributes: ['id', 'name', 'email'],
                            }
                        ]
                    }
                ],
                order: [['sessionStartTime', 'ASC']]
            });
            return res.status(200).json({ status: true, message: STRING_CONSTANTS.BOOKING_FETCH_SUCCESSFULLY, data: bookedSlots });
        } catch (error) {
            return res.status(error.status).json({ status: false, message: error.message });
        }
    }
}

module.exports = new TrainerService();


