const express = require("express");
const router = express.Router();

const { getSingleUser, searchUser } = require("../controllers/user");

// routes
router.get("/user/single/:id", getSingleUser);
router.post("/user/search/:id", searchUser);

module.exports = router;
