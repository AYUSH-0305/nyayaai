import React, { useState } from "react";
import "./RagAssistant.css";

const RagAssistant = () => {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setAnswer("");
    setError("");
  };

  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/rag/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setError("");
      }
    } catch (err) {
      setError("Upload failed");
    }
  };

  const askQuestion = async () => {
    if (!question.trim()) return;

    setAnswer("");
    setIsTyping(true);
    try {
      const res = await fetch("http://localhost:5000/api/rag/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setIsTyping(false);
        return;
      }

      // Typing animation
      const fullText = data.answer;
      let current = "";
      let i = 0;
      const interval = setInterval(() => {
        current += fullText[i];
        setAnswer(current);
        i++;
        if (i >= fullText.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 25);
    } catch (err) {
      setError("Failed to get answer");
      setIsTyping(false);
    }
  };

  return (
    <div className="rag-container">
      <h2>📄 Upload Legal Document & Ask Questions</h2>

      <input type="file" accept=".pdf,.txt" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload</button>

      <div className="question-box">
        <input
          type="text"
          placeholder="Ask something about the uploaded document..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={askQuestion}>Ask</button>
      </div>

      {isTyping && <p className="typing">Generating answer...</p>}
      {answer && <p className="answer"><strong>Answer:</strong> {answer}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default RagAssistant;
