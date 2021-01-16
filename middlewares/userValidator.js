exports.signupValidation = (req, res, next) => {

    req.check('name', 'Name is required!').notEmpty()
    req.check('email', 'Email address is required!').notEmpty().isEmail().withMessage('Please enter a valid email address.')
    req.check('password', 'Password is required!').notEmpty().isLength({ min: 6, max: 15 }).withMessage('Password must be between 6 and 10 characters.')

    const errors = req.validationErrors()
    if (errors) return res.status(400).json(errors)
    next()

}