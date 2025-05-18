const express = require('express');
const router = express.Router();
const { trainerController } = require('../controller/index');
const { trainerDataValidator } = require('../middleware/dataValidator/index');

router.post('/add_session_slot', trainerDataValidator.validateAddSessionSlot, trainerController.addSessionSlot);
router.get('/booking_details', trainerController.bookingDetails);

module.exports = router;

