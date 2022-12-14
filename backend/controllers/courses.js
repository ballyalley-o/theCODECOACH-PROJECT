const ErrorResponse = require("../utilities/errorResponse")
const asyncHandler = require("../middleware/async")
const Course = require("../models/Course")
const Bootcamp = require("../models/Bootcamp")

//Get ALL courses
//Route GET /api/v1/courses
//Route GET /api/v1/bootcamps/:bootcampId/courses
//access Public
exports.getCourses = asyncHandler(async (req, res, next) => {
    if(req.params.bootcampId) {
        const courses = await Course.find({ bootcamp: req.params.bootcampId })

        return res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        })
    } else {
        res.status(200).json(res.advancedResults)
    }
})

//Get single course
//Route GET /api/v1/courses/:id
//access Public
exports.getCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'bootcamp_title description'
    })

    if (!course) {
        return next(new ErrorResponse(`No course found with the id of ${req.params.id}`, 404)
)}
    res.status(200).json({
        success: true,
        data: course
    })
})

//Add a course
//Route POST /api/v1/bootcamps/:bootcampId/courses
//access Private
exports.addCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp with the Id of ${req.params.bootcampId}`),
      404
    );
  }

  //verification if the user is the owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is unauthorized to add a course to Bootcamp ${bootcamp._id}`,
        401
      )
    );
  }

  const course = await Course.create(req.body);

  res.status(201).json({
    success: true,
    data: course,
  });
})

//Update a course
//Route PUT /api/v1/courses/:id
//access Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No course with the Id of ${req.params.id}`),
      404
    );
  }

  //verification if the user is the course owner
  if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is unauthorized to update course ${course._id}`,
        401
      )
    );
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: course,
  });
})

//Delete a course
//Route DELETE /api/v1/courses/:id
//access Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No course with the Id of ${req.params.id}`),
      404
    );
  }

  //verification if the user is the course owner
  if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is unauthorized to remove course ${course._id}`,
        401
      )
    );
  }

  await course.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
})