const mongoose = require('mongoose')

const CarSchema = mongoose.Schema({
    Make: {
        type: String,
        required: true,
       // uppercase: true
    },
    Model: {
        type: String,
        required: true,
        uppercase: true
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
        }
    },
    BodyType: {
        type: String,
        required: true
    },
    DoorCount: {
        type: Number
    },
    SeatCount: {
        type: Number
    },
    Import: {
        value: {
            type: Boolean
        },
        place: {
            type: String
        },
        year: {
            type: Number
        }
    },
    VINum: {
        type: String,
        required: true,
        unique: true,
        index: true,
        uppercase: true
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
        // required: true
    },
    LikedBy: [String],
    Dealer: {
        value: {
            type: Boolean,
            default: false
        },
        Name: {
            type: String,
            default: null
        },
        Phone: {
            type: Number,
            default: null
        },
        Email: {
            type: String,
            default: null
        },
        Location: {
            type: String,
            default: null
        }
    },
    ViewsCount: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    TotalFrames: {
        type: Number,
        required: true
    },
    State: {
        type: String
    },
    isNewCar: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

CarSchema.virtual('MakeModel').get(function(){
    return `${this.Make} ${this.Model}`
})

module.exports = mongoose.model('car list', CarSchema)