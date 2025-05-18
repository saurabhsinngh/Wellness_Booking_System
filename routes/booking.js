const express = require('express');
const router = express.Router();
const { bookingController } = require('../controller/index');
const { bookingDataValidator } = require('../middleware/dataValidator/index');


router.post('/book_session', bookingDataValidator.validateBookingSlot, bookingController.bookSessionSlot);

module.exports = router;
