const ErrorResponse = require('../utilities/errorResponse')

const errHandler = (err, req, res, next) => {
    let error = { ...err }

    error.message = err.message

    //Log to console for dev
    console.log(err)

    //Mongoose bad ObjectID
    if(err.name === 'CastError') {
        const message = 'Request not found'
        error = new ErrorResponse(message, 404)
    }

    //Mongoose duplicate key value
    if (err.code === 11000) {
        const message = `Duplicate field value entered`
        error = new ErrorResponse(message, 400)
    }

    //Mongoose no value entered
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message)
        error = new ErrorResponse(message, 400)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server error'
    })
}

module.exports = errHandler