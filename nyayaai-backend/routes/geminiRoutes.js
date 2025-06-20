const express = require("express");
const router = express.Router();
const { handleChat } = require("../controllers/geminiController");

router.post("/", handleChat); // POST /api/chat

module.exports = router;
