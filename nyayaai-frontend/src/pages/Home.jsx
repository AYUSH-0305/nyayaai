import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to NyayaAI ⚖️</h1>
          <p>Your AI-powered legal assistant for the common people.</p>
          <button onClick={() => navigate("/chat")}>Start Legal Chat</button>
        </div>
        <div className="hero-image">
          <img src="/justice-scale.png" alt="Justice Scale" />
        </div>
      </section>

      <section className="features">
        <h2>What Can You Do with NyayaAI?</h2>
        <div className="feature-list">
          <div className="feature-card">
            <h3>📄 Document Upload</h3>
            <p>Upload FIRs, rent agreements, or screenshots. Let Gemini summarize them instantly.</p>
          </div>
          <div className="feature-card">
            <h3>🧠 Cross-Questioning</h3>
            <p>Use RAG-based interaction to question the uploaded content like a lawyer.</p>
          </div>
          <div className="feature-card">
            <h3>📁 Case Folder System</h3>
            <p>Organize all legal documents under separate case folders for easy access and tracking.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
