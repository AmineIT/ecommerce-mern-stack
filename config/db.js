const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log(`MongoDB Connected: ${connect.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
    }
}

module.exports = connectDB