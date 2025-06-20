// src/components/Navbar.jsx
import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">NyayaAI</div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/chat">Chat</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
