import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages & Components
import Home from "./pages/Home";
import About from "./pages/About";
import Chat from "./pages/Chat";
import CaseFolderList from "./components/CaseFolder/CaseFolderList";
import CaseFolderDetail from "./components/CaseFolder/CaseFolderDetail";

// Global CSS
import "./styles/main.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header className="navbar">
          <h1>NyayaAI ⚖️</h1>
          <nav>
            <a href="/">Home</a>
            <a href="/chat">Chat</a>
            <a href="/folders">Case Folders</a>
            <a href="/about">About</a>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/folders" element={<CaseFolderList />} />
            <Route path="/folders/:id" element={<CaseFolderDetail />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2025 NyayaAI. Built to serve justice for all.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
