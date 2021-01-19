const User = require('../models/user')
const jwt = require('jsonwebtoken')

// @desc    Signup a new user
// @route   POST api/users/signup/
// @access  Public
exports.signup = (req, res) => {

    const user = new User(req.body)
    user.save((error, user) => {

        if (error) return res.status(400).send(error)
        user.hashed_password = undefined
        user.salt = undefined
        res.send(user)

    })

}


// @desc    Login user
// @route   POST api/users/login/
// @access  Public
exports.login = (req, res) => {

    const { email, password } = req.body
    User.findOne({ email }, (error, user) => {

        if (error || !user) {
            return res.status(400).json({
                error: 'User not found with this email address.'
            })
        }

        if (!user.comparePassword(password)) {
            return res.status(401).json({
                error: 'Email and Password do not match!'
            })
        }

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET)
        res.cookie('token', token, { expire: new Date() + 86400000 }) // 1 day

        const { _id, name, email, role } = user
        return res.json({
            token,
            user: {
                _id,
                name,
                email,
                role
            }
        })

    })

}

// @desc    Logout user
// @route   POST api/users/logout/
// @access  Public
exports.logout = (req, res) => {
    res.clearCookie('token')
    return res.json({
        message: 'User logged out!'
    })
}