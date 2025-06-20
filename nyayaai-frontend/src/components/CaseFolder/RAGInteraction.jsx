import React, { useState } from "react";

const RAGInteraction = ({ file }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAsk = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/rag`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, document: file.content }),
    });

    const data = await res.json();
    setAnswer(data.answer);
  };

  return (
    <div className="rag-box">
      <input
        type="text"
        placeholder="Ask a question about the document"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={handleAsk}>Ask</button>
      {answer && <div className="rag-answer"><strong>AI:</strong> {answer}</div>}
    </div>
  );
};

export default RAGInteraction;
