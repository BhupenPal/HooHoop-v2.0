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
    Card: [{
        cardHolderName: {
            type: String,
            required: true
        },
        cardNumber: {
            type: String,
            required: true
        },
        dateExpiryMonth: {
            type: String,
            required: true
        },
        dateExpiryYear: {
            type: String,
            required: true
        },
        windcaveRef: {
            type: String
        }
    }],
    DisplayPic: {
        type: Boolean,
        default: null
    },
    Address: {
        type: String
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
    WishList: [String],
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