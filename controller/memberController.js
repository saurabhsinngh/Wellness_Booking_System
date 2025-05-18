const { memberService } = require('../services/index');

class MemberController {
    /** ***** Member Controller: Method to Register User ******/
    async registerUser(req, res, next) {
        try {
            await memberService.registerUser(req, res, next);
        } catch (error) {
            return res.status(500).json({ status: false, message: 'error' });
        }
    }

    /** ***** Member Controller: Method to View Trainers List ******/
    async viewTrainers(req, res, next) {
        try {
            await memberService.viewTrainers(req, res, next);
        } catch (error) {
            return res.status(500).json({ status: false, message: 'error' });
        }
    }

    /** ***** Member Controller: Method to View Trainers By tainerId ******/
    async viewTrainerById(req, res, next) {
        try {
            await memberService.viewTrainerById(req, res, next);
        } catch (error) {
            return res.status(500).json({ status: false, message: 'error' });
        }
    }

    /** ***** Memeber Controller: Top-up wallets ******/
    async topUpWallet(req, res, next) {
        try {
            await memberService.topUpWallet(req, res, next);
        } catch (error) {
            return res.status(500).json({ status: false, message: 'error' });
        }
    }

    /** ***** Memeber Controller: Check Slots Availability ******/
    async checkSlotAvailable(req, res, next) {
        try {
            await memberService.checkSlotAvailable(req, res, next);
        } catch (error) {
            return res.status(500).json({ status: false, message: 'error' });
        }
    }
}

module.exports = new MemberController();
