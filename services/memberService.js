const SHA256 = require('crypto-js/sha256');
const commonConfig = require('../config/common.config');
const usersModel = require('../models/users');
const { Op } = require('sequelize');
const { STRING_CONSTANTS } = require('../constants/string');
const paginate = require('../helper/paginate');
const sessionSlot = require('../models/sessionSlots');

class MemberService {
    /** ***** Member Service: Method to Register User ******/
    async registerUser(req, res, next) {
        try {
            const payload = req.body;
            const checkEmail = await usersModel.findOne({ where: { email: payload.email }, raw: true });
            if (checkEmail) {
                return res.status(409).json({ status: false, message: STRING_CONSTANTS.EXISTING_EMAIL });
            } else {
                const ciphertext = SHA256(payload.password, commonConfig.PWD_SECRET).toString();
                const registerMember = {
                    name: payload.name,
                    email: payload.email,
                    password: ciphertext,
                    wallet: 0,
                    roleId: payload.roleId,
                };
                const result = await usersModel.create(registerMember);
                return res.status(200).json({ status: true, message: STRING_CONSTANTS.CREATION_SUCCESS, data: result });
            }
        } catch (error) {
            return res.status(error.status).json({ status: false, message: error.message });
        }
    }

    /** ***** Member Service: Method to View Trainers List ******/
    async viewTrainers(req, res, next) {
        try {
            const { page } = req.query;
            const { offset, limit } = paginate({ page });
            const result = await usersModel.findAndCountAll({
                attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'isDeleted'] },
                where: { roleId: 2 },
                offset,
                limit,
                raw: true
            });
            return res.status(200).json({ status: true, message: STRING_CONSTANTS.TRAINERS_LIST, total: result.count, data: result.rows });
        } catch (error) {
            console.log("view_trainers", error)
            return res.status(error.status).json({ status: false, message: error.message });
        }
    }

    /** ***** Member Service: Method to View Trainers By tainerId ******/
    async viewTrainerById(req, res, next) {
        try {
            const result = await usersModel.findOne({ attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'isDeleted', "wallet"] }, where: { id: req.params.id, roleId: 2 }, raw: true });
            if (result) {
                return res.status(200).json({ status: true, message: STRING_CONSTANTS.TRAINER_FOUND, data: result });
            } else {
                return res.status(200).json({ status: true, message: STRING_CONSTANTS.TRAINERS_NOT_EXIST });
            }
        } catch (error) {
            return res.status(error.status).json({ status: false, message: error.message });
        }
    }

    /** ***** Member Service: Method to Top-up wallet ******/
    async topUpWallet(req, res, next) {
        try {
            const { topUpAmount } = req.body;
            const memberId = req.decoded.id;

            if (req.decoded.roleId !== 1) {
                return res.status(403).json({ status: false, message: STRING_CONSTANTS.MEMBER_TOP_UP_WALLET });
            }

            // Get the member 
            const getMember = await usersModel.findOne({
                where: { id: memberId },
                attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'isDeleted'] },
            });

            if (!getMember) {
                return res.status(404).json({ status: false, message: STRING_CONSTANTS.MEMBER_NOT_EXIST });
            }

            // Calculate new newBalance
            const newBalance = (parseInt(getMember.wallet)) + parseInt(topUpAmount);
            let updateWallet = {
                wallet: newBalance
            }
            await usersModel.update(updateWallet, { where: { id: memberId } })
            let updatedWallet = await usersModel.findOne({
                where: { id: memberId },
                attributes: { include: ['wallet'] },
                raw: true
            })
            return res.status(200).json({ status: true, message: STRING_CONSTANTS.TOP_UP_SUCCESS, TotalWalletAmount: updatedWallet.wallet });
        } catch (error) {
            return res.status(error.status).json({ status: false, message: error.message });
        }
    }

    /** ***** Member Service: Method to Check Slots Availability ******/
    async checkSlotAvailable(req, res, next) {
        try {
            const totalSlots = await sessionSlot.findAndCountAll({
                where: {
                    isBooked: false,
                    isDeleted: 0,
                    sessionStartTime: { [Op.gte]: new Date() },
                },
                order: [['sessionStartTime', 'ASC']],
            });
            res.status(200).json({ message: STRING_CONSTANTS.FETCH_AVAILABLE_SLOTS, total: totalSlots.count, data: totalSlots.rows });
        } catch (error) {
            return res.status(error.status).json({ status: false, message: error.message });
        }
    }
}

module.exports = new MemberService();

