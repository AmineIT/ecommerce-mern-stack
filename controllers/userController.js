const User = require('../models/user')

// @desc    Get user profile
// @route   GET /api/users/profile/:userId
// @access  Private
exports.getAuthUser = (req, res) => {

    req.profile.hashed_password = null
    req.profile.salt = null

    res.json({
        user: req.profile
    })

}

// @desc    Edit user profile
// @route   POST /api/users/edit-profile/:userId
// @access  Private
exports.editProfile = (req, res) => {

    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false }
    ).exec((error, user) => {
        if (error) {
            return res.status(400).json({
                error: 'An error occured while updating this user!'
            })
        }

        user.hashed_password = null
        user.salt = null
        res.json(user)
    })

}