const jwt = require('jsonwebtoken');
const commonConfig = require('../../config/common.config');
const Yup = require('yup');
const { STRING_CONSTANTS } = require('../../constants/string');

class ApiAuthValidator {
    /** ***** Api auth validator: Method to validate access token ******/
    validateAccessToken(req, res, next) {
        const checkToken = req.headers.authorization
        if (checkToken) {
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, commonConfig.JWT_SECRET, function (err, decoded) {
                if (err) {
                    return res.status(401).json({ status: false, message: STRING_CONSTANTS.ACCESS_TOKEN_EXPIRED });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(401).send({ 'status': false, 'message': STRING_CONSTANTS.ACCESS_TOKEN_REQUIRED });
        }
    }

    /** ***** Api auth validator: Method to validate refresh token ******/
    validateRefreshToken(req, res, next) {
        const checkToken = req.headers.authorization
        if (checkToken) {
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, commonConfig.JWT_SECRET, function (err, decoded) {
                if (err) {
                    return res.status(401).json({ status: false, message: STRING_CONSTANTS.REFRESH_TOKEN_EXPIRED });
                }
                req.decoded = decoded;
                next();
            });
        } else {
            return res.status(401).send({ 'status': false, 'message': STRING_CONSTANTS.REFRESH_TOKEN_REQUIRED });
        }
    }

    /** ***** Api auth validator: Method to validate api key ******/
    validateApiKey(req, res, next) {
        const checkUrl = req.url;
        if (checkUrl.includes('privacy_policy')) {
            next();
        } else {
            if (!req.headers['x-api-key']) {
                return res.status(401).send({ 'status': false, 'message': STRING_CONSTANTS.API_KEY_NOT_FOUND });
            } else {
                if (!req.headers['platform']) {
                    return res.status(403).send({ 'status': false, 'message': STRING_CONSTANTS.PLATFORM_NOT_FOUND });
                } else {
                    const platform = req.headers['platform'].toLowerCase();
                    let key;
                    switch (platform) {
                        case 'web':
                            key = commonConfig.API_KEY;
                            break;
                    }
                    if (req.headers['x-api-key'] == key) {
                        next();
                    } else {
                        return res.status(401).send({ 'status': false, 'message': STRING_CONSTANTS.INVALID_APIKEY_OR_PLATFORM });
                    }
                }
            }
        }
    }
}

module.exports = new ApiAuthValidator();
