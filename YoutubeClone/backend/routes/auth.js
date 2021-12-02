const express = require("express");
const router = express.Router();
const { signup, signin, signout } = require("../controllers/auth");

// validators
const { runValidation } = require("../validators");
const {
  userSignupValidator,
  userSigninValidator,
} = require("../validators/auth");

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/signin", userSigninValidator, runValidation, signin);
router.get("/signout", signout);

module.exports = router;
