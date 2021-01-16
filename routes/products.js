const express = require('express')
const router = express.Router()

const {
    allProducts,
    relatedProduct,
    createProduct,
    showProduct,
    productById,
    removeProduct,
    updateProduct,
    searchProduct,
    productPhoto
} = require('../controllers/productController')
const { requireSignIn, isAuth, isAdmin } = require('../middlewares/auth')
const { userById } = require('../middlewares/user')

router.get('/', allProducts)
router.get('/:productId', showProduct)
router.get('/related-products/:productId', relatedProduct)
router.get('/product-photo/:productId', productPhoto)
router.post('/create/:userId', [requireSignIn, isAuth, isAdmin], createProduct)
router.post('/search', searchProduct)
router.put('/:productId/:userId', [requireSignIn, isAuth, isAdmin], updateProduct)
router.delete('/:productId/:userId', [requireSignIn, isAuth, isAdmin], removeProduct)

router.param('userId', userById)
router.param('productId', productById)

module.exports = router