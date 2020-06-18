const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Phone: {
        type: Number,
        required: true
    },
    Address: {
        type: String
    },
    Role: {
        type: String,
        required: true,
        enum: ['admin', 'dealer', 'user']
    },
    DealershipName: {
        type: String
    },
    DealershipEmail: {
        type: String
    },
    DealershipPhone: {
        type: Number
    },
    DealershipNZBN: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    SecretToken: {
        type: String
    },
    ResetToken: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model('user lists', UserSchema)