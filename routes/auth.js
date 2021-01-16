const express = require('express')
const router = express.Router()

const { signup, login, logout } = require('../controllers/authController')
const { signupValidation } = require('../middlewares/userValidator')

router.post('/signup', signupValidation, signup)
router.post('/login', login)
router.get('/logout', logout)

module.exports = router