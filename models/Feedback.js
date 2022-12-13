const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a title to your Feedback"],
    maxlength: 100
  },
  body: {
    type: String,
    required: [true, "Please add a description"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "Please rating is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

//restriction for some roles to add/edit permissions for feedback users
FeedbackSchema.index({
  bootcamp: 1, user: 1 }, { unique: true })


//static method to get the average rating
FeedbackSchema.statics.getAverageRating = async function (bootcampId) {
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: "$bootcamp",
        averageRating: { $avg: "$rating" },
      },
    },
  ]);
  try {
    await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
      averageRating: obj[0].averageRating
    });
  } catch (err) {
    console.error(err);
  }
};

//Call averageRating after save
FeedbackSchema.post("save", function () {
  this.constructor.getAverageRating(this.bootcamp);
});

//Call averageRating before remove
FeedbackSchema.pre("remove", function () {
  this.constructor.getAverageRating(this.bootcamp);
});


module.exports = mongoose.model('Feedback', FeedbackSchema)