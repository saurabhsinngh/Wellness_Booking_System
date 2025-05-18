const Yup = require('yup');
const constant = require('../../constants/constant');

class BookingDataValidator {
    /** ***** Booking data Validation ******/
    validateBookingSlot(req, res, next) {
        const schema = Yup.object().shape({
            slotId: Yup.string().required('Slot Id is required').matches(constant.ONLY_NUMBERS, 'Slot Id must be a number')
        });
        schema
            .validate(req.body, { abortEarly: false })
            .then((response) => {
                next()
            })
            .catch((err) => {
                next(err);
            });
    }
}

module.exports = new BookingDataValidator();