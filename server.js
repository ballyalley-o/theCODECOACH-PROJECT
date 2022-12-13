const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const cookieParser = require('cookie-parser')
const fileupload = require('express-fileupload')
const mongoSanitizer = require('express-mongo-sanitize')
const errHandler = require('./middleware/error')
const helmet = require('helmet')
const xss = require('xss-clean')
const expRateLimit = require('express-rate-limit')
const hpp = require("hpp");
const cors = require('cors')
const connectDB = require('./config/db')


//load env vars
dotenv.config({path: './config/config.env'})

//connect to database
connectDB()

//route files
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')
const auth = require('./routes/auth')
const users = require("./routes/users");
const feedbacks = require("./routes/feedbacks");


const app = express()

//body parser
app.use(express.json())

app.use(cookieParser())

// dev loggin middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//file uploading
app.use(fileupload())

//sanitize all data
app.use(mongoSanitizer());
//security headers
app.use(helmet())
//avoid xss attacks
app.use(xss())
//avoid http param pollution
app.use(hpp())

//cors implementation
app.use(cors())

//rate limit
const rateLimiter = expRateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 50
})
app.use(rateLimiter)


//set static folder path
app.use(express.static(path.join(__dirname, 'public')))

//mount routers
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses),
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users);
app.use("/api/v1/feedbacks", feedbacks);


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
  // server.close(() => process.exit(1))
})