const Yup = require('yup');

class TrainerDataValidator {
    /** ***** Trainer Validateor: Method to validate Session Slot ******/
    validateAddSessionSlot(req, res, next) {
        const schema = Yup.object().shape({
            sessionStartTime: Yup.string()
                .required('Session start time is required'),
            sessionEndTime: Yup.string()
                .required('Session end time is required')
        });
        schema
            .validate(req.body, { abortEarly: false })
            .then((response) => {
                next();
            })
            .catch((err) => {
                next(err);
            });
    }
}

module.exports = new TrainerDataValidator();
