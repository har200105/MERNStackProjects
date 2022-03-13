const express = require("express");
const {
  register,
  login,
  followUser,
  // logout,
  updatePassword,
  updateProfile,
  deleteMyProfile,
  myProfile,
  getUserProfile,
  getAllUsers,
  forgotPassword,
  resetPassword,
  getMyPosts,
  getUserPosts,
  allUsers,
  blockUser,
  unblockUser,
  verifyUser
} = require("../controllers/user");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// router.post("/logout",logout);
router.put("/follow/:id",isAuthenticated, followUser);
router.put("/update/password",isAuthenticated, updatePassword);
router.put("/update/profile",isAuthenticated, updateProfile);
router.delete("/delete/me",isAuthenticated, deleteMyProfile);
router.get("/me",isAuthenticated, myProfile);
router.get("/my/posts",isAuthenticated, getMyPosts);
router.get("/userposts/:id",isAuthenticated, getUserPosts);
router.get("/user/:id",isAuthenticated, getUserProfile);
router.get("/users",isAuthenticated, getAllUsers);
router.post("/forgot/password",forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.route("/search").get(isAuthenticated, allUsers);
router.route("/:id").put(isAuthenticated,blockUser);
router.put("/unblockUser/:id", isAuthenticated, unblockUser);
router.post("/verifyUser/:token",verifyUser);


module.exports = router;