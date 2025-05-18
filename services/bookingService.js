const sessionSlot = require('../models/sessionSlots');
const { STRING_CONSTANTS } = require('../constants/string');
const usersModel = require('../models/users');
const booking = require('../models/bookings');
const { sendMockEmail } = require('../utils/email');

class BookingService {
    /** ***** Booking Service: Method to Booking Session Slot ******/
    async bookSessionSlot(req, res, next) {
        try {
            const memberId = req.decoded.id;
            const slotId = req.body.slotId;

            // Fetch user and validate role
            const getmember = await usersModel.findByPk(memberId);
            if (!getmember || req.decoded.roleId !== 1) {
                return res.status(403).json({ status: false, message: STRING_CONSTANTS.ONLY_MEMBER_BOOK_SESSION });
            }

            // Fetch the slot
            const slot = await sessionSlot.findOne({ where: { id: slotId, isDeleted: 0, isBooked: false }, raw: true });
            if (!slot) {
                return res.status(404).json({ status: false, message: STRING_CONSTANTS.SLOT_NOT_FOUND_OR_ALREADY_BOOK });
            }

            // Check wallet balance
            if (parseInt(getmember.wallet) < 200) {
                return res.status(400).json({ status: false, message: STRING_CONSTANTS.BOOKING_FAILED_DUE_TO_INSUFFICIENT_BALENCE });
            }

            // Deduct ₹200 from wallet
            let walletCurrentAmount = parseInt(getmember.wallet) - 200;
            let updateWallet = {
                wallet: walletCurrentAmount
            }
            await usersModel.update(updateWallet, { where: { id: memberId } })

            await sessionSlot.update({ isBooked: true }, { where: { id: slotId } })

            // Create booking record
            let bookingObj = {
                memberId: memberId,
                sessionSlotId: slot.id,
            }
            const bookingRecord = await booking.create(bookingObj);

            // Send mock email notification
            const sessionTime = `Start: ${slot.sessionStartTime}, End: ${slot.sessionEndTime}`;
            const emailBody = `
            Hi ${getmember.name},

            Your session has been booked successfully.

            Session Time: ${sessionTime}
            Booking ID: ${bookingRecord.id}

            Thank you! `;

            await sendMockEmail(getmember.email, 'Session Booking Confirmation', emailBody);
            return res.status(201).json({ status: true, message: STRING_CONSTANTS.SESSION_BOOKED_SUCCESS, booking: bookingRecord });
        } catch (error) {
            console.error(error);
            return res.status(error.status).json({ status: false, message: error.message });
        }
    }
}

module.exports = new BookingService();


