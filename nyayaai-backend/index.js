const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require("path");

dotenv.config();
const app = express();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// File upload setup
const upload = multer({ dest: "uploads/" });

// 🧠 Gemini prompt template
const formatPrompt = (text) => `
You are a legal AI assistant. Convert the explanation below into structured JSON like this:

[
  {
    "title": "Section Title",
    "points": ["Point 1", "Point 2"]
  }
]

Instructions:
- Format as pure JSON
- Use short, clear bullet points
- No Markdown/code blocks

Text:
"""${text}"""
`;

// 🧠 Text-based Q&A Chat
app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(formatPrompt(userMessage));
    const raw = result.response.text().trim();
    const clean = raw.replace(/```json|```/g, "").trim();

    let structured;
    try {
      structured = JSON.parse(clean);
    } catch {
      structured = [{ title: "Response", points: [raw] }];
    }

    res.json({ response: structured });
  } catch (err) {
    console.error("Gemini Error:", err.message);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

// 📎 Upload document (FIR, agreement, screenshot)
app.post("/api/upload", upload.single("document"), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: "No file uploaded" });

  try {
    // ✅ Simulate extracted text (replace with OCR/PDF parsing logic)
    const extractedText = `This document outlines the complaint under IPC Section 498A, including verbal and physical harassment by the accused. The complaint was filed with the local police station and includes a record of previous domestic abuse incidents.`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(formatPrompt(extractedText));
    const raw = result.response.text().trim();
    const clean = raw.replace(/```json|```/g, "").trim();

    let structured;
    try {
      structured = JSON.parse(clean);
    } catch {
      structured = [{ title: "Document Summary", points: [raw] }];
    }

    res.json({ response: structured });
  } catch (err) {
    console.error("Upload Summarization Error:", err.message);
    res.status(500).json({ error: "Upload summarization failed" });
  } finally {
    // Clean up the uploaded file
    if (file && file.path) fs.unlink(file.path, () => {});
  }
});

// ❓ RAG-based cross-questioning
app.post("/api/rag", async (req, res) => {
  const { question, context } = req.body;

  const ragPrompt = `
You are a legal assistant. Based on the following context, answer the user's question.

Context:
"""${context}"""

User Question:
"${question}"

Answer in clear, short legal explanation.
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(ragPrompt);
    const response = result.response.text().trim();

    res.json({ response });
  } catch (err) {
    console.error("RAG Error:", err.message);
    res.status(500).json({ error: "Failed to generate RAG response" });
  }
});

// Root Route
app.get("/", (req, res) => {
  res.send("✅ NyayaAI backend running");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
