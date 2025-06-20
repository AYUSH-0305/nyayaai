const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateStructuredResponse = async (text) => {
  const prompt = `
You are a legal assistant. Convert the following explanation into structured JSON like this:
[
  {
    "title": "Section Title",
    "points": ["Point 1", "Point 2"]
  }
]
Avoid Markdown or code blocks.

Text:
"""${text}"""
`;

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-pro" });
  const result = await model.generateContent(prompt);
  const raw = result.response.text().replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(raw);
  } catch {
    return [{ title: "Response", points: [raw] }];
  }
};

exports.summarizeDocument = async (text) => {
  const prompt = `
Summarize this legal document in short bullet points.

Text:
"""${text}"""
`;

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text().trim();
};
