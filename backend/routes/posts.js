const express = require("express");
const {
  getFeedPosts,
  getUserPosts,
  likePost,
} = require("../controllers/posts");

const { protect } = require("../middleware/auth");

const router = express.Router()

//get posts
router
.get('/', protect, getFeedPosts)


router
.get(':id/posts', protect, getUserPosts)


//interactions
router.patch("/:id/like", protect, likePost)

module.exports = router;


