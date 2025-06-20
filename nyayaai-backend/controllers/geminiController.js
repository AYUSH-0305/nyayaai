const { GoogleGenerativeAI } = require("@google/generative-ai");
const api_key = "AIzaSyDa9Iq4KyTWxgpld0baoFfCJrGsLwGXaDE"
const genAI = new GoogleGenerativeAI(api_key);

/**
 * Prompt Gemini and return structured JSON
 */
exports.handleChat = async (req, res) => {
  const userMessage = req.body.message;

  const prompt = `
You are a legal AI assistant. Convert the explanation below into structured JSON like this:

[
  {
    "title": "Section Title",
    "points": ["Point 1", "Point 2"]
  }
]

Instructions:
- Format as pure JSON.
- Use clear, short bullet points.
- Do not include Markdown or code blocks.

Text:
"""${userMessage}"""
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    let structuredData;
    try {
      const cleanText = responseText.replace(/```json|```/g, "").trim();
      structuredData = JSON.parse(cleanText);
    } catch (err) {
      structuredData = [
        {
          title: "Full AI Response",
          points: [responseText],
        },
      ];
    }

    res.json({ response: structuredData });
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    res.status(500).json({ error: "Gemini failed to respond." });
  }
};
