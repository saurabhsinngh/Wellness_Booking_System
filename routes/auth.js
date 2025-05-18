const express = require('express');
const router = express.Router();
const { authController } = require('../controller/index');
const { authDataValidator } = require('../middleware/dataValidator/index');
const { memberDataValidator } = require('../middleware/dataValidator/index');
const { apiAuthValidator } = require('../middleware/authValidator/index');

router.post('/login', authDataValidator.login, authController.userLogin);
router.post('/access_token', apiAuthValidator.validateRefreshToken, authController.generateAccessToken);
router.post('/change_password', apiAuthValidator.validateAccessToken, memberDataValidator.changePasssword, authController.changePasssword);

module.exports = router;
