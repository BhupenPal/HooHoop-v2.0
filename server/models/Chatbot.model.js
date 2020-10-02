const mongoose = require('mongoose')

const CarSchema = mongoose.Schema({
    Name: {
        type: String,
    },
    RegisteredUser: {
        type: mongoose.Schema.Types.ObjectId
    },
    NotRegisteredUser: {
        Phone: {
            type: Number,
        },
        Email: {
            type: String,
        }
    },
    //Use this to store OTP until the deal is done
    Discount: {
        type: Number
    },
    isTemp: {
        type: Boolean
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('chatbot queries', CarSchema)