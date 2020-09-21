const mongoose = require("mongoose");

const NoDealModel = mongoose.Schema({
    Email: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true
    },
    VINum: {
        type: String,
        required: true
    },
    CustomerLastOffer: {
        type: Number,
        required: true
    },
    MakeModel: {
        type: String,
        required: true
    },
    AuthorID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        //True means query is active
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("no deal queries", NoDealModel);