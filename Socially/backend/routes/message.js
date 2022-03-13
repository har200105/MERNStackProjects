const express = require("express");
const { allMessages, sendMessage } = require("../controllers/message");
const { isAuthenticated } = require("../middleware/auth");


const router = express.Router();

router.route("/:chatId").get(isAuthenticated, allMessages);
router.route("/").post(isAuthenticated, sendMessage);

module.exports = router;
