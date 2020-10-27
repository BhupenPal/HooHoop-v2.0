const mongoose = require('mongoose')

const TransactSchema = mongoose.Schema({
    Type: {
        type: String,
        enum: ['Credits Added To Account', 'Debited for featuring a car'],
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user list',
        required: true
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('transactions', TransactSchema)