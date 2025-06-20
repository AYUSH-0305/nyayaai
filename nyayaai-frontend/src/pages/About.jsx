// src/pages/About.jsx
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1>About NyayaAI</h1>
        <p>
          NyayaAI is an AI-powered legal assistant designed to help individuals understand
          their legal rights and find answers to common legal questions—quickly and easily.
        </p>
        <p>
          Our mission is to simplify the complex world of law and make legal help accessible
          to everyone, especially those who cannot afford traditional legal services.
        </p>
        <p>
          This tool is not a substitute for a lawyer but provides general guidance on common
          legal topics like consumer rights, property issues, contracts, and more.
        </p>
        <p>
          <strong>Built with ❤️ using React and Gemini.</strong>
        </p>
      </div>
    </div>
  );
};

export default About;
