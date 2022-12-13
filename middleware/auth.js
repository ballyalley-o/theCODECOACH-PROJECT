const jwt = require('jsonwebtoken');
const asyncHandler = require('./async')
const ErrorResponse = require('../utilities/errorResponse')
const User = require('../models/User')

//protect routes
exports.protect = asyncHandler(async(req, res, next) => {
    let token;

        //set auth token from header-token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }   //set auth token from cookie
    else if (req.cookies.token) {
        token = req.cookies.token
    }

    //make sure token exists
if (!token) {
    return next(new ErrorResponse('Not authorize to access this route', 401))

} try {
    //token verification
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    console.log(decoded)

    req.user = await User.findById(decoded.id)

    next()

} catch(err) {
    return next(new ErrorResponse("Not authorize to access this route", 401));
}

})


//grant access to certain roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
             return next(
               new ErrorResponse(`Current role ${req.user.role} is unauthorized to access this route`, 403)
             );
        }
        next()
    }

}