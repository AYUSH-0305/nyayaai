const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.post("/", chatController.getChatResponse);
module.exports = router;
