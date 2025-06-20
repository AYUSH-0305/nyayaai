const geminiService = require("../services/geminiService");

exports.getChatResponse = async (req, res) => {
  try {
    const userMessage = req.body.message;
    const formattedResponse = await geminiService.generateStructuredResponse(userMessage);
    res.json({ response: formattedResponse });
  } catch (error) {
    console.error("Chat Error:", error.message);
    res.status(500).json({ error: "Failed to process chat request" });
  }
};
