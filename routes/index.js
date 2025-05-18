const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const memberRoutes = require('./member');
const trainerRoutes = require('./trainer');
const bookingRoutes = require('./booking');

const { apiAuthValidator } = require('../middleware/authValidator');

router.use('/auth', authRoutes);
router.use('/member', apiAuthValidator.validateAccessToken, memberRoutes);
router.use('/trainer', apiAuthValidator.validateAccessToken, trainerRoutes);
router.use('/booking', apiAuthValidator.validateAccessToken, bookingRoutes);

module.exports = router;
