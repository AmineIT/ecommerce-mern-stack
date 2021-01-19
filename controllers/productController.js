const Product = require('../models/product')
const formidable = require('formidable')
const fs = require('fs')
const _ = require('lodash')

// @desc    Create new Product
// @route   POST api/product/create/
// @access  Private
exports.createProduct = (req, res) => {

    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (error, fields, files) => {

        if (error) {
            return res.status(400).json({
                error: 'Failed to upload image.'
            })
        }

        let product = new Product(fields)
        if (files.photo) {
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
        product.save((error, product) => {
            if (error) {
                return res.status(400).json({
                    error: 'An error has occured while creating a new product!'
                })
            }
            res.json(product)
        })

    })

}

// @desc    Fetch single Product by ID
// @route   GET api/product/:productId/
// @access  Public
exports.productById = (req, res, next, id) => {

    Product.findById(id).exec((error, product) => {
        if (error || !product) {
            return res.status(400).json({
                error: 'Product not found!'
            })
        }
        req.product = product
        next()
    })

}

// @desc    Fetch All Products
// @route   GET api/product/
// @access  Public
exports.allProducts = (req, res) => {

    const sortBy = req.query.sortBy || 'createdAt'
    const order = req.query.order || 'asc'
    const limit = parseInt(req.query.limit) || 5

    Product.find()
        .select('-photo')
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((error, product) => {

            if (error || !product) {
                return res.status(400).json({
                    error: 'Product not found!'
                })
            }

            res.json(product)

        })

}

// @desc    Fetch Related Products
// @route   GET api/product/related-products/:productId
// @access  Public
exports.relatedProduct = (req, res) => {

    const limit = parseInt(req.query.limit) || 5
    Product.find({ category: req.product.category, _id: { $ne: req.product._id } })
        .limit(limit)
        .select('-photo')
        .populate('category', '_id name')
        .exec((error, product) => {

            if (error || !product) {
                return res.status(400).json({
                    error: 'Product not found!'
                })
            }

            res.json(product)

        })

}

// @desc    Display single Product
// @route   Get api/product/:productId
// @access  Public
exports.showProduct = (req, res) => {
    req.product.photo = null
    res.json({
        product: req.product
    })
}

// @desc    Edit Product
// @route   PUT api/product/:productId/:userId
// @access  Private
exports.updateProduct = (req, res) => {

    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (error, fields, files) => {

        if (error) {
            return res.status(400).json({
                error: 'Failed to upload image.'
            })
        }

        let product = req.product
        product = _.extend(product, fields)

        if (files.photo) {
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
        product.save((error, product) => {
            if (error) {
                return res.status(400).json({
                    error: 'An error has occured while updating a new product!'
                })
            }
            res.json(product)
        })

    })

}

// @desc    Search For Products With Multiple Criteria
// @route   POST api/product/search
// @access  Public
exports.searchProduct = (req, res) => {

    const sortBy = req.query.sortBy || 'createdAt'
    const order = req.query.order || 'asc'
    const limit = parseInt(req.body.limit) || 5
    const skip = parseInt(req.body.skip)
    let findArgs = {}

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === 'price') {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key]
            }
        }
    }

    Product.find(findArgs)
        .select('-photo')
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .skip(skip)
        .exec((error, product) => {

            if (error || !product) {
                return res.status(400).json({
                    error: 'Product not found!'
                })
            }

            res.json(product)

        })

}

// @desc    Get Product Image
// @route   DELETE api/product/product-photo/:productId
// @access  Public
exports.productPhoto = (req, res) => {

    const { data, contentType } = req.product.photo
    if (data) {
        res.set('Content-Type', contentType)
        return res.send(data)
    }

}

// @desc    Delete Product
// @route   DELETE api/product/:productId/
// @access  Private
exports.removeProduct = (req, res) => {

    let product = req.product
    product.remove((error, product) => {

        if (error) {
            return res.status(404).json({
                error: 'Product not found!'
            })
        }

        res.json({
            message: 'Product was deleted!'
        })

    })

}