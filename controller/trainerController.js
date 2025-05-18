const { trainerService } = require('../services/index');

class TrainerController {
    /** ***** Trainer Controller: add Session Slots ******/
    async addSessionSlot(req, res, next) {
        try {
            await trainerService.addSessionSlot(req, res, next);
        } catch (error) {
            return res.status(500).json({status: false, message: 'error'});
        }
    }

    /** ***** Trainer Controller: Get Booking Details ******/
    async bookingDetails(req, res, next) {
        try {
            await trainerService.bookingDetails(req, res, next);
        } catch (error) {
            return res.status(500).json({status: false, message: 'error'});
        }
    }
}

module.exports = new TrainerController();
