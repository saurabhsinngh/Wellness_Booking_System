const { bookingService } = require('../services/index');

class BookingController {
    /** ***** Booking Controller: add Session Slot Booking******/
    async bookSessionSlot(req, res, next) {
        try {
            await bookingService.bookSessionSlot(req, res, next);
        } catch (error) {
            return res.status(500).json({status: false, message: 'error'});
        }
    }
}

module.exports = new BookingController();
