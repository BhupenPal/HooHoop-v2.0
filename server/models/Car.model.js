const mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');

const CarSchema = mongoose.Schema({
    Make: {
        type: String,
        required: true,
        uppercase: true
    },
    Model: {
        type: String,
        required: true,
        uppercase: true
    },
    MakeModel: {
        type: String,
        required: true
    },
    ModelYear: {
        type: Number,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    MinPrice: {
        type: Number
    },
    Featured: {
        value: {
            type: Boolean,
            default: null
        },
        validTill: {
            type: Date,
            default: null
        },
        transactiondId: [{
            type: mongoose.Schema.Types.ObjectId,
            default: null
        }]
    },
    Accessories: [String],
    BodyType: {
        type: String,
        required: true
    },
    DoorCount: {
        type: Number,
        default: null
    },
    SeatCount: {
        type: Number
    },
    Imported: {
        type: Boolean,
        default: false
    },
    VINum: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        index: true
    },
    KMsDriven: {
        type: Number,
        required: true
    },
    Color: {
        type: String,
        required: true
    },
    EngineSize: {
        type: String,
        required: true
    },
    Transmission: {
        type: String,
        required: true
    },
    FuelType: {
        type: String,
        required: true
    },
    FuelStar: {
        type: Number,
        default: 0
    },
    SafetyStar: {
        type: Number,
        default: 0
    },
    WOFExpiry: {
        type: String,
        required: true
    },
    REGExpiry: {
        type: String,
        required: true
    },
    DriveWheel4: {
        type: Boolean,
        default: false
    },
    ONRoadCost: {
        type: Boolean,
        default: false
    },
    Description: {
        type: String
    },
    Author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user list',
        required: true
    },
    LikedBy: [String],
    ViewsCount: {
        type: Number,
        default: 0
	},
	LeadsGenerated: {
		type: Number,
        default: 0	
	},
    isActive: {
        type: Boolean,
        default: true
    },
    ImageData: {
		Interior: {
			type: Boolean,
			default: false
		},
        VideoFrames: {
            type: Number,
            deafult: 0
        },
        SliderCount: {
            type: Number,
            default: 0
        }
    },
    State: {
        type: String,
        required: true
    },
    isNewCar: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

CarSchema.plugin(uniqueValidator)

module.exports = mongoose.model('car list', CarSchema)