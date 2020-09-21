const mongoose = require("mongoose");

const ShippingModel = new Schema({
    FullName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Phone: {
        type: Number,
        required: true
    },
    ShipTo: {
        type: String,
        required: true
    },
    status: {
        //True means query is active
        type: Boolean,
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
    AuthorID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("shipment queries", ShippingModel);