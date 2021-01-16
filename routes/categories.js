const express = require('express')
const router = express.Router()

const {
    allCategories,
    createCategory,
    showCategory,
    categoryById,
    updateCategory,
    removeCategory
} = require('../controllers/categoryController')
const { requireSignIn, isAuth, isAdmin } = require('../middlewares/auth')
const { userById } = require('../middlewares/user')

router.get('/', allCategories)
router.post('/create/:userId', [requireSignIn, isAuth, isAdmin], createCategory)
router.get('/:categoryId', showCategory)
router.put('/:categoryId/:userId', [requireSignIn, isAuth, isAdmin], updateCategory)
router.delete('/:categoryId/:userId', [requireSignIn, isAuth, isAdmin], removeCategory)

router.param('userId', userById)
router.param('categoryId', categoryById)

module.exports = router