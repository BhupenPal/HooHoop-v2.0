const mongoose = require('mongoose')

const ContactSchema = mongoose.Schema({
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
    },
    Files: {
        type: Boolean
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('contact us', ContactSchema)