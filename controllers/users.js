const ErrorResponse = require("../utilities/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");


//Get all users
//GET /api/v1/auth/users
//Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults)
});

//Get a user
//GET /api/v1/auth/users/:userId
//Private.=/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    res.status(200).json({
        success: true,
        message: 'User successfully fetched',
        data: user
    })
});

//Create a new user
//POST /api/v1/auth/users
//Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body);

    res.status(201).json({
        success: true,
        message: 'User successfully created',
        data: user
    })
});

//Update a user
//PUT/api/v1/auth/users/:id
//Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
     const user = await User.findByIdAndUpdate(req.params.id, req.body, {
       new: true,
       runValidators: true,
     });

    res.status(200).json({
        success: true,
        message: 'User successfully updated from the database',
        data: user
    })
});

//Delete a user
//PUT/api/v1/auth/users/:id
//Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: 'User successfully removed from the database',
        data: {}
    })
});



