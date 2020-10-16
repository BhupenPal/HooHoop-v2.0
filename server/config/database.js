const mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate-v2'),
    aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const connection = mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: !0,
    useUnifiedTopology: !0,
    useCreateIndex: !0,
    useFindAndModify: !1,
    autoIndex: !1
})
.then( () => {
    console.log('Mongoose connected to db')
})
.catch( err => {
    console.log(err.message)
})

mongoose.connection.on('connected', () => {
    console.log('Mongodb bridge connected')
})

mongoose.connection.on('error', (err) => {  
    console.log('Mongoose connection ERROR: ' + err)
}) 

mongoose.connection.on('disconnected', () => {  
    console.log('Mongoose connection disconnected') 
})

process.on('SIGINT', async () => {  
    await mongoose.connection.close()
    process.exit(0)
})

mongoose.plugin(mongoosePaginate)
mongoose.plugin(aggregatePaginate)

module.exports = connection