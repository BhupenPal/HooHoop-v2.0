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
        unique: true,
        lowercase: true
    },
    Password: {
        type: String,
        default: null
    },
    GoogleID: {
        type: String,
        default: null
    },
    FacebookID: {
        type: String,
        default: null
    },
    Phone: {
        type: Number,
        unique: true
    },
    Address: {
        type: String
    },
    State: {
        type: String,
        default: null
    },
    Gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    Role: {
        type: String,
        required: true,
        enum: ['admin', 'dealer', 'user'],
        default: 'user'
    },
    DealershipName: {
        type: String,
        default: null
    },
    DealershipEmail: {
        type: String,
        default: null
    },
    DealershipPhone: {
        type: Number,
        default: null
    },
    DealershipNZBN: {
        type: String,
        default: null
    },
    EmailVerified: {
        type: Boolean,
        default: false
    },
    PhoneVerified: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
    SecretToken: {
        type: String,
        default: null
    },
    ResetToken: {
        type: String,
        default: null
    },
    Credits: {
        type: Number,
        default: process.env.DEFAULT_CREDIT
    },
    CanSellNewCar: {
        type: Boolean,
        default: false
    },
    EncryptedCore: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('user list', UserSchema)