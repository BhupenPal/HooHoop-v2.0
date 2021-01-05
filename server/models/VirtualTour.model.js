const mongoose = require('mongoose'),
	uniqueValidator = require('mongoose-unique-validator');

const TourSchema = mongoose.Schema({
	APID: {
		type: String,
		required: true
	},
	Name: {
		type: String,
		required: true,
		uppercase: true
	},
	Partner: {
		// Only for verified and partner dealerships
		type: Boolean,
		default: true
	},
	isActive: {
		type: Boolean,
		default: true
	},
	State: {
		type: String,
		required: true
	},
	Brand: {
		type: String,
		required: true,
		default: 'custom'
	}
},
{
	timestamps: true
})

TourSchema.plugin(uniqueValidator)

module.exports = mongoose.model('virtual tour', TourSchema)