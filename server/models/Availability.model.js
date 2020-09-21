const mongoose = require("mongoose")

const AvailabilityModel = mongoose.Schema({
    FullName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
    },
    Phone: {
        type: Number,
        required: true,
    },
    CarID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    VINum: { 
        type: String, 
        required: true
    },
    MakeModel: {
        type: String,
        required: true
    },
    status: {
        //True means query is active
        type: Boolean,
        default: true
    },
    AuthorID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("availability queries", AvailabilityModel);