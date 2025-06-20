const geminiService = require("../services/geminiService");
const fs = require("fs");

exports.uploadDocument = async (req, res) => {
  try {
    const fileText = fs.readFileSync(req.file.path, "utf8");
    const summary = await geminiService.summarizeDocument(fileText);
    res.json({ summary });
  } catch (error) {
    console.error("Upload Error:", error.message);
    res.status(500).json({ error: "Failed to summarize file" });
  }
};
