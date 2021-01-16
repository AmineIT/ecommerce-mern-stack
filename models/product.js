const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100,
        trim: true
    },
    description: {
        type: String,
        maxlength: 2000,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    shipping: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Product', ProductSchema)