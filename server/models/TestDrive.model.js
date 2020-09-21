const mongoose = require("mongoose");

const TestDrive = mongoose.Schema({
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
    CarID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    VINum: {
        type: String,
        required: true
    },
    Status: {
        //True means query is active
        type: Boolean,
        required: true
    },
    MakeModel: {
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

module.exports = mongoose.model("test drive queries", TestDrive);
