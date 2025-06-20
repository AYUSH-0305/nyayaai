const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.crossQuestion = async (req, res) => {
  const { context, question } = req.body;

  const prompt = `
You are an AI legal assistant. Use the following context to answer the user's question clearly and precisely.

Context:
"""${context}"""

Question:
${question}
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();
    res.json({ answer: responseText });
  } catch (error) {
    console.error("RAG Gemini Error:", error.message);
    res.status(500).json({ error: "RAG processing failed" });
  }
};
