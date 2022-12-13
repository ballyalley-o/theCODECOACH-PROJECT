const express = require('express')
const { register, login, logoutMe, getMe, forgotPassword, resetPassword, updateDetails, updatePassword } = require('../controllers/auth')


const router = express.Router()

const { protect } = require('../middleware/auth')

router.post('/register', register)
router.post('/login', login)
router.get("/logout", logoutMe);
router.get("/me", protect, getMe);
router.put("/update_details", protect, updateDetails);
router.put("/update_password", protect, updatePassword);
router.post("/forgot_password", forgotPassword);
router.put("/reset_password/:resettoken", resetPassword);



module.exports = router