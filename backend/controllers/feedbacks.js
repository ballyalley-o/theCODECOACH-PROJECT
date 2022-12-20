const ErrorResponse = require("../utilities/errorResponse");
const asyncHandler = require("../middleware/async");
const Feedback = require("../models/Feedback");
const Bootcamp = require("../models/Bootcamp");
const { response, request } = require("express");


//Get ALL Feedbacks
//Route GET /api/v1/feedbacks
//Route GET /api/v1/bootcamps/:bootcampId/feedbacks
//access Public
exports.getFeedbacks = asyncHandler(async (req, res, next) => {
    if(req.params.bootcampId) {
        const feedbacks = await Feedback.find({ bootcamp: req.params.bootcampId })

        return res.status(200).json({
            success: true,
            message: "successfully fetched all feedbacks",
            count: feedbacks.length,
            data: feedbacks
        })
    } else {
        res.status(200).json(res.advancedResults)
    }
})

//Get a Feedback
//Route GET /api/v1/feedbacks/:id
//access Public
exports.getFeedback = asyncHandler(async (req, res, next) => {
    const feedback = await Feedback.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'
    });

    if (!feedback) {
        return next(new ErrorResponse(`No feedback found with the id ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        message: 'Feedback successfully fetched',
        data: feedback
    })
})

//Add feedback
//Route POST/api/v1/bootcamps/:bootcampId/feedbacks
//access Public
exports.addFeedback = asyncHandler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId;
    req.body.user = req.user.id;

    const bootcamp = await Bootcamp.findById(req.params.bootcampId)

    if (!bootcamp) {
        return next(new ErrorResponse(`No bootcamp found with the id ${req.params.bootcampId}`, 404));
    }

    const feedback = await Feedback.create(req.body)

    res.status(201).json({
        success: true,
        message: 'Feedback successfully added',
        data: feedback
    })
})

//Update feedback
//Route PUT /api/v1/feedbacks/:id
//access Public
exports.updateFeedback = asyncHandler(async (req, res, next) => {
    let feedback = await Feedback.findById(req.params.id)

    if (!feedback) {
        return next(new ErrorResponse(`No feedback found with the id ${req.params.id}`, 404));
    }

    //verification if the feedback belongs to the user/admin
    if(feedback.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User unauthorized to access this feedback ${req.params.id}`, 401));
    }

    feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        message: 'Feedback successfully updated',
        data: feedback
    })
})

// Delete feedback
//Route DELETE /api/v1/feedbacks/:id
//access Public
exports.deleteFeedback = asyncHandler(async (req, res, next) => {
    const feedback = await Feedback.findById(req.params.id)

    if (!feedback) {
        return next(new ErrorResponse(`No feedback found with the id ${req.params.id}`, 404));
    }

    //verification if the feedback belongs to the user/admin
    if(feedback.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User unauthorized to delete this feedback ${req.params.id}`, 401));
    }

    await feedback.remove()

    res.status(200).json({
        success: true,
        message: 'Feedback successfully deleted',
        data: {}
    })
})