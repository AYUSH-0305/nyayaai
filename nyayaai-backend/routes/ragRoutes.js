const express = require("express");
const { crossQuestion } = require("../controllers/ragController");
const router = express.Router();

router.post("/ask", crossQuestion);

module.exports = router;
