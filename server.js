const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const fileupload = require('express-fileupload')
const errHandler = require('./middleware/error')
const connectDB = require('./config/db')


//load env vars
dotenv.config({path: './config/config.env'})

//connect to database
connectDB()

//route files
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')

const app = express()

//body parser
app.use(express.json())

// dev loggin middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}


//file uploading
app.use(fileupload())

//set static folder path
app.use(express.static(path.join(__dirname, 'public')))

//mount routers
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)

app.use(errHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow)
)

//Handle unhandled promise rejections
process.on('unchandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`)

  //close server & exit process
  server.close(() => process.exit(1))
})