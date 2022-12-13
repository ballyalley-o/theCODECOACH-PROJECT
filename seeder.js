const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')

//Load env vars
dotenv.config({ path:'./config/config.env' })

//Load models
const Bootcamp = require('./models/Bootcamp')
const Course = require("./models/Course");
const User = require("./models/User");
const Feedback = require("./models/Feedback");

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {})

//Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/seeds/bootcamps.json`, 'utf-8'))
const courses = JSON.parse(fs.readFileSync(`${__dirname}/seeds/courses.json`, "utf-8"))
const users = JSON.parse(fs.readFileSync(`${__dirname}/seeds/users.json`, "utf-8"));
const feedbacks = JSON.parse(
  fs.readFileSync(`${__dirname}/seeds/feedbacks.json`, "utf-8")
);
//Import to DB
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps)
        await Course.create(courses)
        await User.create(users);
        await Feedback.create(feedbacks);

        console.log('Data Imported...'.blue.inverse)
        process.exit()
    } catch(err) {
        console.error(err)
    }
}

//Delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany()
    await Course.deleteMany()
    await User.deleteMany();
    await Feedback.deleteMany();

    console.log("Data Destroyed...".red.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

if (process.argv[2] === '-i') {
    importData()
} else if (process.argv[2] === '-d') {
    deleteData()
}