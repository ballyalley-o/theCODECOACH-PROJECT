const crypto = require('crypto');
const ErrorResponse = require("../utilities/errorResponse")
const asyncHandler = require("../middleware/async")
const sendEmail = require("../utilities/sendEmail")
const User = require("../models/User")


//Register user
//POST /api/v1/auth/register
//Public
exports.register = asyncHandler(async (req, res, next) => {
   const { firstName, lastName, email, role, password, picturePath, friends, location } = req.body;

   //creat user
    const user = await User.create({
        firstName,
        lastName,
        email,
        role,
        password,
        picturePath,
        friends,
        location,
        viewedProfile: Math.floor(Math.random() * 10000),
        impressions: Math.floor(Math.random() * 10000),
    })

 sendTokenResponse(user, 200, res)
})

//Login user
//POST /api/v1/auth/login
//Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //Validation email and password
  if (!email || !password) {

    return next(
      new ErrorResponse("Please provide a valid email and password", 400)
    );
  }
  //check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Credentials Invalid", 401));
  }

  //check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Credentials Invalid", 401));
  }

  sendTokenResponse(user, 200, res);
})

//Get Log out User
//GET /api/v1/auth/logout
//Private
exports.logoutMe = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true
  })

  res.status(200).json({
    success: true,
    message: `User logged out successfully`,
    data: {}
  })
})


//Get current logged in user
//GET /api/v1/auth/me
//Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;

  res.status(200).json({
    success: true,
    message: 'Request successful',
    data: req.user
  })
})



//Update user details
//PUT /api/v1/auth/update_details
//Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role
  }

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: 'Updated details',
    data: user
  })
})


//Update Password
//PUT /api/v1/auth/update_password
//Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');


  //check current password
   if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse("Password is invalid", 401));
   }

   user.password = req.body.newPassword;
   await user.save();

   sendTokenResponse(user, 200, res)
})


//Forgot Password
//POST/api/v1/auth/forgot_password
//Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return next(new ErrorResponse(`There is no user with email ${req.body.email}`, 404))
  }

  //Get reset TOKEN
const resetToken = user.getResetPasswordToken();

await user.save({ validateBeforeSave: false })

//Create reset URL
const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/reset_password/${resetToken}`;

const message = `A request has been made to reset your password. If you made this request, please copy the following code into the prompt in: \n\n ${resetUrl} to verify your identity.`;
 try {
  await sendEmail({
    email: user.email,
    subject: 'Password reset token',
    message
  })

  res.status(200).json({
    success: true,
    data: 'Email sent'
  })

 } catch (err) {
  console.log(err);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save({
    validateBeforeSave: false
  });

  return next(new ErrorResponse('Email could not be sent', 500))
 }

  res.status(200).json({
    success: true,
    message: 'Email sent',
    data: user
  })
})


//RESET PASSWORD
//PUT /api/v1/auth/resetpassword/:resettoken
//Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
//get hashed token
  let resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');


  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  })

  if (!user) {
    return next(new ErrorResponse('Invalid Token', 400))
  }

  //set new password
  user.password = req.body.password;
  resetPasswordToken = undefined;
  resetPasswordExpire = undefined;
  await user.save();

 sendTokenResponse(user, 200, res);
})



//get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {

  //Create Token
  const token = user.getSignedJwtToken()

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true
  }

  if (process.env.NODE_ENV === 'production') {
    options.secure = true
  }
  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
        success: true,
        token
    })
}

