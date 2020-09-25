const mongoose = require("mongoose");

const Coupons = mongoose.Schema({
    CustomerID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true
    },
    CarID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    AuthorID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    MakeModel: {
        type: String,
        required: true
    },
    CouponCode: {
        type: String,
        required: true
    },
    Discount: {
        type: String,
        required: true
    },
    CarPrice: {
        type: Number,
        required: true
    }
}, 
{ 
    timestamps: true
});

module.exports = mongoose.model("coupons", Coupons);