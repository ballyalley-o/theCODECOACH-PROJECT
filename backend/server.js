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
const multer = require('multer')
const bodyParser = require('body-parser')
const { fileURLToPath } = require('url')
const { protect } = require("./middleware/auth");
const { register } = require("./controllers/auth");
const { createPost } = require("./controllers/posts");


//load env vars
dotenv.config({path: '../config.env'})

//connect to database
connectDB()

//route files
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')
const auth = require('./routes/auth')
const users = require("./routes/users");
const feedbacks = require("./routes/feedbacks");
const posts = require("./routes/posts");


const app = express()


//body parsers
app.use(express.json())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


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
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
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

//file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage })


//routes with file upload
app.post('/auth/register', upload.single('picture'), register)
app.post("/posts/create", protect, upload.single('picture'), createPost)

//mount routers
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses),
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users);
app.use("/api/v1/feedbacks", feedbacks);

//mount club routers
app.use("/posts", posts);

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