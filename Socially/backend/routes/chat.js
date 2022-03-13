const express = require("express");
const { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup } = require("../controllers/chat");

const { isAuthenticated } = require("../middleware/auth");


const router = express.Router();

router.route("/").post(isAuthenticated, accessChat);
router.route("/").get(isAuthenticated, fetchChats);
router.route("/group").post(isAuthenticated, createGroupChat);
router.route("/rename").put(isAuthenticated, renameGroup);
router.route("/groupremove").put(isAuthenticated, removeFromGroup);
router.route("/groupadd").put(isAuthenticated, addToGroup);

module.exports = router;
