const Bootcamp = require("../models/Bootcamp")
const ErrorResponse = require("../utilities/errorResponse")
const geocoder = require("../utilities/geocoder")
const asyncHandler = require("../middleware/async")

//Get ALL bootcamps
//Route GET /api/v1/bootcamps
//access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query
  //copy query string
  let queryStr = JSON.stringify(req.query)

  //copy req.query
  const reqQuery = {...req.query }

  //fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit']

  //loop over the removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param])

  //create query string
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

  //append query operators
  query = Bootcamp.find(JSON.parse(queryStr))

  //select fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ')
    query =  query.select(fields)
  }

  //sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ')
    query = query.sort(sortBy)
  } else{
    query = query.sort('name')
  }

  const page = parseInt(req.query.page, 10) || 1
  const limit = parseInt(req.query.limit, 10) || 25
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const total = await Bootcamp.countDocuments()

  query = query.skip(startIndex).limit(limit)

  //executing query
    const bootcamps = await query

    //pagination results
    const pagination = {}

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      }
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
    }
  }
    res.status(200).json({ success: true, count: bootcamps.length, pagination, data: bootcamps })
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
   const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

   if (!bootcamp) {
     return next(
       new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
     )
   }
   res.status(200).json({ success: true, data: {} })
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
