const express = require("express");
const router = express.Router();
const reqLogin = require('../middleware/reqLogin');

// controllers
const {
  uploadVideo,
  uploadVideoDetails,
  getSingleVideo,
  list,
  increaseView,
  increaseSubscribe,
  getSubscribers,
  searchVideo,
  increaseLike,
} = require("../controllers/video");

// routes
router.post("/video/upload",reqLogin, uploadVideo);
router.post(
  "/video/uploadDetails",
  reqLogin,
  uploadVideoDetails
);
router.get("/video/single/:id", getSingleVideo);
router.get("/videos", list);
router.post("/video/increaseView", increaseView);
router.post("/subscribe", reqLogin, increaseSubscribe);
router.post("/subscribers", getSubscribers);
router.post("/video/search", searchVideo);
router.put('/video/like',reqLogin,increaseLike)

module.exports = router;
