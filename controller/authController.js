const { authService } = require('../services/index');

class AuthController {
    /** ***** Auth Controller: Method to perform user login ******/
    async userLogin(req, res, next) {
        try {
            await authService.userLogin(req, res, next);
        } catch (error) {
            return res.status(500).json({status: false, message: 'error'});
        }
    }

    /** ***** Auth Controller: Method to generate new access token ******/
    async generateAccessToken(req, res, next) {
        try {
            await authService.generateAccessToken(req, res, next);
        } catch (error) {
            return res.status(500).json({status: false, message: 'error'});
        }
    }

    /** ***** Auth Controller: Method to change passsword ******/
    async changePasssword(req, res, next) {
        try {
            await authService.changePasssword(req, res, next);
        } catch (error) {
            return res.status(500).json({status: false, message: 'error'});
        }
    }
}

module.exports = new AuthController();
