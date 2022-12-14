const express = require("express");

const {
    getUsers,
    getUser,
    getUserFriends,
    addRemoveFriend,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/users");

const User = require("../models/User");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");

router
  .use(protect)
  .use(authorize('admin'))

router
.route('/')
        .get(advancedResults(User), getUsers)
        .post(createUser)

router
  .route("/:id")
     .get(getUser)
     .put(updateUser)
     .delete(deleteUser);

module.exports = router;
