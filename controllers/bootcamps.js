const path = require('path')
const Bootcamp = require("../models/Bootcamp")
const ErrorResponse = require("../utilities/errorResponse")
const geocoder = require( "../utilities/geocoder")
const asyncHandler = require("../middleware/async")

//Get ALL bootcamps
//Route GET /api/v1/bootcamps
//access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {

    res.status(200).json(res.advancedResults)
})

//Get single bootcamp
//Route GET /api/v1/bootcamp/:id
//access Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id)

    if(!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    )}
    res.status(200).json({ success: true, data: bootcamp })
})

//Create NEW bootcamp
//Route POST /api/v1/bootcamps
//access PRIVATE
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body)

  res.status(201).json({
    success: true,
    data: bootcamp,
  })
})

//UPDATE bootcamp
//Route PUT /api/v1/bootcamps/:id
//access PRIVATE
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    )
  }
  res.status(200).json({ success: true, data: bootcamp })
})

//DELETE bootcamp
//Route DELETE /api/v1/bootcamps/:id
//access PRIVATE
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
   const bootcamp = await Bootcamp.findById(req.params.id)

   if (!bootcamp) {
     return next(
       new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
     )
   }

   bootcamp.remove()

   res.status(200).json({ success: true, data: {} })
})


//Upload Photo bootcamp
//Route PUT /api/v1/bootcamps/:id/photo
//access PRIVATE
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
   const bootcamp = await Bootcamp.findById(req.params.id)

   if (!bootcamp) {
     return next(
       new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
     )
   }

   if (!req.files) {
      return next(new ErrorResponse(`Please upload a photo`, 400))
   }

   const file = req.files.file

   if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400))
   }

//check file size
   if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(new ErrorResponse(`the Photo you are trying to upload exceeds the maximum size limit`, 400))
   }

//Create custom filename
file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`

file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
  if (err) {
    console.error(err)
    return next( new ErrorResponse(`Problem occurred during the upload`, 500))
  }
  await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name })

  res.status(200).json({
    success: true,
    data: file.name
  })
  })
})

//Get bootcamps within a radius
//Route GET /api/v1/bootcamps/radius/:zipcode/:distance
//access PRIVATE
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
   const { zipcode, distance } = req.params

  //Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode)
  const lat = loc[0].latitude
  const lng = loc[0].longitude



  //compute radius using radians
  //divide distance by radius of earth
  //earth radius = 3,963 mi / 6,378 km

  const radius = distance / 3963

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [ [ lng, lat ], radius ]}}
  })

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data:bootcamps
  })
})
