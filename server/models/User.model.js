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
    DisplayPic: {
        type: Boolean,
        default: false
    },
    Address: {
        type: String,
        default: null
    },
    State: {
        type: String,
        default: null
    },
    DOB: {
        type: Date,
        default: null
    },
    Gender: {
        type: String,
        enum: ['male', 'female', 'other', null],
        default: null
    },
    Role: {
        type: String,
        required: true,
        enum: ['admin', 'dealer', 'user', 'staff'],
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
    WishList: [String],
    // Used By Admin to deactivate account
    isActive: {
        type: Boolean,
        default: true
    },
    SecretToken: {
        type: String,
        default: null
    },
    PassResetToken: {
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
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('user list', UserSchema)