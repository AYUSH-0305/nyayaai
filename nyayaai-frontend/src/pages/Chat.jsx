import React, { useState } from "react";
import "../styles/chat.css";
import StructuredResponse from "../components/StructuredResponse";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [fileSummary, setFileSummary] = useState(null);

  const handleTextChange = (e) => setMessage(e.target.value);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    setResponse(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSubmit = async () => {
    if (!file) return alert("Please upload a document first!");

    const formData = new FormData();
    formData.append("document", file);

    setIsLoading(true);
    setFileSummary(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setFileSummary(data.response);
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <h2>📄 Legal Chat Assistant</h2>

      {/* TEXT INPUT SECTION */}
      <form onSubmit={handleTextSubmit} className="chat-form">
        <textarea
          value={message}
          onChange={handleTextChange}
          placeholder="Ask your legal question or paste a document summary..."
          rows={5}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : "Submit"}
        </button>
      </form>

      {/* FILE UPLOAD SECTION */}
      <div className="file-section">
        <label>📎 Upload FIR / Rent Agreement / Screenshot</label>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileSubmit} disabled={isLoading}>
          {isLoading ? "Analyzing..." : "Summarize & Cross-Question"}
        </button>
      </div>

      {/* OUTPUT SECTION */}
      <div className="chat-response">
        {isLoading && <p className="typing">🧠 Processing...</p>}

        {response && <StructuredResponse data={response} />}
        {fileSummary && (
          <>
            <h3>📘 Document Summary</h3>
            <StructuredResponse data={fileSummary} />
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
