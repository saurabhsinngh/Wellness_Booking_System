const SHA256 = require('crypto-js/sha256');
const commonConfig = require('../config/common.config');
const usersModel = require('../models/users');
const roleModel = require('../models/roles');
const tokenService = require('./tokenService');
const { STRING_CONSTANTS } = require('../constants/string');

class AuthService {
    /** ***** Auth Service: Method to user login ******/
    async userLogin(req, res, next) {
        try {
            const ciphertext = SHA256(req.body.password, commonConfig.PWD_SECRET).toString();
            const result = await usersModel.findOne({ where: { email: req.body.email, password: ciphertext, isDeleted: 0, status: 1 }, raw: true });
            if (result) {
                if (result.status) {
                    const tokens = tokenService.generateTokens({ id: result.id, email: req.body.email, roleId: result.roleId });
                    const role = await roleModel.findOne({ where: { id: result.roleId }, raw: true });
                    const data = {
                        id: result.id,
                        name: result.name,
                        email: result.email,
                        token: tokens,
                        role: role.name,
                        roleId: role.id,
                    };
                    return res.status(200).json({ status: true, message: STRING_CONSTANTS.LOGIN_SUCCESS, data: data });
                } else {
                    return res.status(401).json({ status: false, message: STRING_CONSTANTS.USER_INACTIVE });
                }
            } else {
                return res.status(401).json({ status: false, message: STRING_CONSTANTS.INVALID_CREDENTIALS });
            }
        } catch (error) {
            return res.status(500).json({ status: false, message: STRING_CONSTANTS.ERROR });
        }
    }

    /** ***** Auth Service: Method to generate access token ******/
    async generateAccessToken(req, res, next) {
        let token;
        try {
            token = tokenService.generateAccessTokens({ email: req.decoded.email, id: req.decoded.id, role: req.decoded.role });
            const tokenExpiry = tokenService.getTokenExpiry(token.accessToken);
            token.accessTokenExpiry = tokenExpiry.exp;
            return res.status(200).json({ status: true, message: STRING_CONSTANTS.NEW_ACCESS_TOKEN, token: token });
        } catch (error) {
            return res.status(500).json({ status: false, message: STRING_CONSTANTS.ERROR });
        }
    }

    /** ***** Auth Service: Method to change passsword ******/
    async changePasssword(req, res, next) {
        try {
            let payload = req.body
            const oldPassword = SHA256(payload.oldPassword, commonConfig.PWD_SECRET).toString();
            const user = await usersModel.findOne({ where: { password: oldPassword, id: req.decoded.id }, raw: true });
            if (!user) {
                return res.status(401).json({ status: false, message: STRING_CONSTANTS.INCORRECT_OLD_PASSWORD });
            }
            if (payload.oldPassword === payload.newPassword) {
                return res.status(400).json({ status: false, message: STRING_CONSTANTS.NEWPASSWORD_NOT_SAME_OLDPASSWORD });
            } else {
                const updatedPassword = SHA256(payload.newPassword, commonConfig.PWD_SECRET).toString();
                await usersModel.update({ password: updatedPassword }, { where: { id: req.decoded.id }, raw: true });
                return res.status(200).json({ status: true, message: STRING_CONSTANTS.UPDATED_MESSAGE });
            }
        } catch (error) {
            console.log("ERROR", error);
            return res.status(500).json({ status: false, message: STRING_CONSTANTS.ERROR });
        }
    }
}

module.exports = new AuthService();
