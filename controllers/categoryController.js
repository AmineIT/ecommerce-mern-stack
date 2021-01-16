const Category = require('../models/category')

// @desc    Create new category
// @route   POST api/category/create/
// @access  Private
exports.createCategory = (req, res) => {

    const category = new Category(req.body)
    category.save((error, category) => {
        if (error) return res.status(400).json(error)

        res.json(category)
    })

}

// @desc    Fetch single Category by ID
// @route   GET api/category/:categoryId/
// @access  Private
exports.categoryById = (req, res, next, id) => {

    Category.findById(id).exec((error, category) => {
        if (error || !category) {
            return res.status(400).json({
                error: 'Category not found!'
            })
        }
        req.category = category
        next()
    })

}

// @desc    Fetch single Category
// @route   GET api/category/:categoryId/
// @access  Private
exports.showCategory = (req, res) => {
    res.json({
        category: req.category
    })
}

// @desc    Edit Category
// @route   PUT api/category/:categoryId/:userId
// @access  Private
exports.updateCategory = (req, res) => {

    let category = req.category
    category.name = req.body.name
    category.save((error, category) => {
        if (error) return res.status(400).json(error)

        res.json(category)
    })

}

// @desc    Delete Category
// @route   DELETE api/category/:categoryId/:userId
// @access  Private
exports.removeCategory = (req, res) => {

    let category = req.category
    category.remove((error, product) => {

        if (error) {
            return res.status(404).json({
                error: 'Category not found!'
            })
        }

        res.json({
            message: 'Category was deleted!'
        })

    })

}

// @desc    Get Category Counts
// @route   GET api/category/
// @access  Private
exports.allCategories = (req, res) => {

    Category.find().exec((error, category) => {

        if (error) {
            return res.status(500).json({
                error: 'Category not found!'
            })
        }

        res.json(category)

    })

}