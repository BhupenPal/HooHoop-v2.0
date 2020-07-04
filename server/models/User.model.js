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
        required: true,
        unique: true
    },
    Address: {
        type: String
    },
    State: {
        type: String,
        required: true
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
        default: 300
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('user list', UserSchema)