const mongoose = require('mongoose')

const TransactSchema = mongoose.Schema({
	TID: {
		type: String
	},
    Type: {
        type: String,
        enum: ['Credits added to account', 'Debited for featuring a car', 'Deducted by Hoohoop NZ'],
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
	Car: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'car list'
	},
	Status: {
		type: String,
		enum: ['Processed', 'Not verified by Paypal then declined by Hoohoop'],
		default: 'Processed'
	}
},
{
    timestamps: true
})

module.exports = mongoose.model('transactions', TransactSchema)