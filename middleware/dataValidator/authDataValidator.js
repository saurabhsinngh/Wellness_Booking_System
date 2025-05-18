const Yup = require('yup');

class AuthDataValidator {
    /** ***** Auth data validator: Method to validate email & password present in login request ******/
    login(req, res, next) {
        const schema = Yup.object().shape({
            email: Yup.string().required('Email is required').email('Invalid Email'),
            password: Yup.string().trim().required('Password is required').min(3, 'Password should be atleast 3 characters'),
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

module.exports = new AuthDataValidator();
