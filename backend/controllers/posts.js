const ErrorResponse = require("../utilities/errorResponse");
const asyncHandler = require("../middleware/async");
const Post = require("../models/Post");
const User = require("../models/User");

//Create post
//Route POST /club/posts
//access Public
exports.createPost = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const user = await User.findById(req.params.id)

  const post = await Post.create(req.body);

  res.status(201).json({
    success: true,
    data: post,
  });
});
//  try {
//     const { id, description, picturePath } = req.body;
//     const user = await User.findById(req.params.id);
//     const newPost = new Post({
//       firstName: user.firstName,
//       lastName: user.lastName,
//       location: user.location,
//       description,
//       userPicturePath: user.picturePath,
//       picturePath,
//       likes: {},
//       comments: []
//     });

//     await newPost.save()
//     const post = await Post.create(req.body);
//     res.status(201).json(post, {
//         success: true,
//         message: 'Post successfully created',
//         data: post
//     })
//  } catch (err) {
//     res.status(404).json({
//         message: err.message
//     })
//     }

//Get all feeds
//Route GET /api/v1/
//access Public
exports.getFeedPosts = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.find();
    res.status(200).json({
      success: true,
      message: "All Posts successfully fetched",
      data: post,
    });
  } catch (error) {
    res.status(404).json({
      message: err.message,
    });
  }
});

//Get user posts
//Route GET /api/v1/
//access Public
exports.getUserPosts = asyncHandler(async (req, res, next) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json({
      success: true,
      message: "User Posts successfully fetched",
      data: post,
    });
  } catch (error) {
    res.status(404).json({
      message: err.message,
    });
  }
});

// Like/Dislike Posts
//Route POST /api/v1/
//access Public
exports.likePost = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.body;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: `Post successfully ${isLiked ? "disliked" : "liked"}`,
      data: updatedPost,
    });
  } catch (error) {
    res.status(404).json({
      message: err.message,
    });
  }
});
