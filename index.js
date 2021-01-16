const express = require('express')
const app = express()
const expressValidator = require('express-validator')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
require('dotenv').config()

const authRouter = require('./routes/auth')
const userRouter = require('./routes/users')
const categoryRouter = require('./routes/categories')
const productRouter = require('./routes/products')

// Setup the MongoDB connection
connectDB()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(expressValidator())
app.use(cookieParser())
app.use(morgan('dev'))

// Routes Middlewares
app.use('/api', authRouter)
app.use('/api', userRouter)
app.use('/api/category', categoryRouter)
app.use('/api/product', productRouter)

// Setup the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})