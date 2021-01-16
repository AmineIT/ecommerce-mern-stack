const mongoose = require('mongoose')
const { v1: uuid } = require('uuid')
const crypto = require('crypto')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50,
        unique: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
    },
    about: {
        type: String,
        trim: true
    },
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }
}, { timestamps: true })

UserSchema.virtual('password').set(function (password) {
    this_password = password
    this.salt = uuid()
    this.hashed_password = this.cryptPassword(password)
}).get(() => {
    return this._password
})

UserSchema.methods = {
    comparePassword: function (plainText) {
        return this.cryptPassword(plainText) === this.hashed_password
    },
    cryptPassword: function (password) {
        if (!password) return ''

        try {

            return crypto.createHmac('sha1', this.salt).update(password).digest('hex')

        } catch (error) {

        }
    }
}

module.exports = mongoose.model('User', UserSchema)