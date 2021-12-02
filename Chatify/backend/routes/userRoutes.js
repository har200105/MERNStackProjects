const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  blockUser,
  unblockUser
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/:id").put(protect,blockUser);
router.put("/unblockUser/:id",unblockUser);

module.exports = router;
