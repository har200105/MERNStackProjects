const express = require("express");
const {
  createPost,
  likeAndUnlikePost,
  deletePost,
  getPostOfFollowing,
  updateCaption,
  commentOnPost,
  deleteComment,
  replyComment
} = require("../controllers/post");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.post("/post/upload",isAuthenticated, createPost);
router.put("/post/like/:id", isAuthenticated, likeAndUnlikePost);
router.put("/post/:id", isAuthenticated, updateCaption);
router.delete("/post/:id",isAuthenticated, deletePost);
router.get("/posts", isAuthenticated, getPostOfFollowing);
router.put("/post/comment/:id",isAuthenticated, commentOnPost);
router.put("/delete/comment/:id", isAuthenticated, deleteComment);
router.put("/reply/comment/:id",isAuthenticated, replyComment);

module.exports = router;