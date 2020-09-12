const mongoose = require('mongoose')

const ContactSchema = mongoose.Schema({
    ComplaintNum: {
        type: String,
        required: true
    },
    FullName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Subject: {
        type: String,
        required: true
    },
    Message: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('contact us', ContactSchema)