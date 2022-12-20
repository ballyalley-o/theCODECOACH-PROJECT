const express = require('express')

const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload

 } = require('../controllers/bootcamps')

const Bootcamp = require('../models/Bootcamp')


// include other resource routers
const courseRouter = require('./courses')
const feedbackRouter = require("./feedbacks");

const router = express.Router()

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require('../middleware/auth')

//Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter)
router.use("/:bootcampId/feedbacks", feedbackRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)

router
  .route("/:id/photo")
  .put(protect, authorize("trainer", "admin"), bootcampPhotoUpload);

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, authorize("trainer", "admin"), createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize("trainer", "admin"), updateBootcamp)
  .delete(protect, authorize("trainer", "admin"), deleteBootcamp);



module.exports = router