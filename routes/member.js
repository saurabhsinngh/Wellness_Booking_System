const express = require('express');
const router = express.Router();
const { memberController } = require('../controller/index');
const { memberDataValidator } = require('../middleware/dataValidator/index');

router.post('/register_user', memberDataValidator.validateRegisterUser, memberController.registerUser);
router.get('/view_trainers_list', memberController.viewTrainers);
router.get('/view_trainers/:id', memberController.viewTrainerById);

router.post('/top_up_wallet', memberDataValidator.validatetopUpWallet, memberController.topUpWallet);
router.get('/session_slots_available', memberController.checkSlotAvailable);

module.exports = router;
