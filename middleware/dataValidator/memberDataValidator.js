const Yup = require('yup');
const constant = require('../../constants/constant');

class MemberDataValidator {
    /** ***** Memeber Data Validateor: Method to validate Register User ******/
    validateRegisterUser(req, res, next) {
        const schema = Yup.object().shape({
            name: Yup.string()
                .trim()
                .required('Name is required')
                .min(3, 'Name Should Be Atleast 3 Characters')
                .max(30, 'Name Should Be Max 30 Characters'),
            email: Yup.string().required('Email Is Required').email('Invalid Email'),
            password: Yup.string().trim().required('Password Is Required').min(3, 'Password Should Be Atleast 3 Characters'),
            roleId: Yup.string().trim().required('Role Id is required').matches(constant.ONLY_NUMBERS, 'Role Id must be a number'),
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

    /** ***** Api auth validator: Method to change password ******/
    changePasssword(req, res, next) {
        const schema = Yup.object().shape({
            newPassword: Yup.string().trim().required('Password is required').min(3, 'Password should be atleast 3 characters'),
            oldPassword: Yup.string().trim().required('Old Password is required'),
        });
        schema.validate(req.body, { abortEarly: false }).then((response) => {
            next();
        }).catch((err) => {
            next(err);
        });
    }

    /** ***** Method to validate the top-up wallet ******/
    validatetopUpWallet(req, res, next) {
        const schema = Yup.object().shape({
            topUpAmount: Yup.number()
                .typeError('topUpAmount must be a number')
                .required('topUpAmount is required')
                .positive('topUpAmount must be greater than 0')
                .integer('topUpAmount must be an integer'),
        });
        schema.validate(req.body, { abortEarly: false }).then((response) => {
            next();
        }).catch((err) => {
            next(err);
        });
    }
}

module.exports = new MemberDataValidator();
