import React from 'react';
import { Link } from "react-router-dom";
import Banner2 from '../assets/Banner2.jpg';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${Banner2})` }}>
      <div className="corner-tl"></div>
      <div className="corner-br"></div>
      <div className="headerContainer">
        <div className="hero-eyebrow">Est. 2024 — Pakistan's Gaming Hub</div>
        <h1 className="hero-title">
          <span className="title-main">Game</span>
          <span className="title-accent">Xpress</span>
        </h1>
        <p className="hero-subtitle">
          Where Every Game Finds a <span>Player</span>. Premium PS4 &amp; PC titles delivered to your door.
        </p>
        <div className="hero-cta-group">
          <Link to="/Items">
            <button className="hero-btn">Shop Now</button>
          </Link>
          <Link to="/About" className="hero-btn-secondary">Our Story</Link>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-number">50+</span>
            <span className="hero-stat-label">Games</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-number">500+</span>
            <span className="hero-stat-label">Orders</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-number">100%</span>
            <span className="hero-stat-label">Genuine</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;