const mongoose = require("mongoose");

const LeadGenratedModel = mongoose.Schema({
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
    VINum: {
        type: String,
        required: true
    },
    MakeModel: {
        type: String,
        required: true
    },
    Author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user list',
        required: true
    },
    QueryFor: {
        TestDrive: {
            type: Boolean,
            default: false
        },
        TestDriveStatus: {
            type: Boolean,
            default: true
        },
        Shipment: {
            type: Boolean,
            default: false,
        },
        ShipmentStatus: {
            type: Boolean,
            default: true
        },
        CallBack: {
            type: Boolean,
            default: false
        },
        CallBackstatus: {
            type: Boolean,
            default: true
        }
    },
    WantsToTrade: {
        type: Boolean,
        required: false
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("leads generated", LeadGenratedModel);