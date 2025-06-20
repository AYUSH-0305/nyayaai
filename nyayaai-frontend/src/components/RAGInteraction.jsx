import React, { useState } from "react";
import "./RAGInteraction.css";

const RAGInteraction = ({ context }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [typing, setTyping] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTyping(true);
    setAnswer("");

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/rag/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ context, question }),
    });

    const data = await res.json();
    typeEffect(data.answer);
  };

  const typeEffect = (text) => {
    let i = 0;
    const interval = setInterval(() => {
      setAnswer((prev) => prev + text[i]);
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setTyping(false);
      }
    }, 25);
  };

  return (
    <div className="rag-container">
      <form onSubmit={handleSubmit}>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a legal question"
          className="rag-input"
        />
        <button type="submit">Ask</button>
      </form>
      {typing ? <p className="typing">Generating...</p> : <p>{answer}</p>}
    </div>
  );
};

export default RAGInteraction;
