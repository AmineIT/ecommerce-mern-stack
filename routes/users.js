const express = require('express')
const router = express.Router()

const { userById } = require('../middlewares/user')
const { getAuthUser, editProfile } = require('../controllers/userController')
const { requireSignIn, isAuth } = require('../middlewares/auth')

router.get('/profile/:userId', requireSignIn, isAuth, getAuthUser)
router.put('/edit-profile/:userId', requireSignIn, isAuth, editProfile)
router.param('userId', userById)

module.exports = router