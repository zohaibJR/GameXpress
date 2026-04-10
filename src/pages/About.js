import React from 'react';
import AboutUsBG from '../assets/aboutusBG.jpg';
import '../styles/About.css';

function About() {
  return (
    <div className="about">
      <div
        className="aboutTop"
        style={{ backgroundImage: `url(${AboutUsBG})` }}
        role="img"
        aria-label="Gaming Background"
      >
        <div className="aboutTop-glow"></div>
      </div>
      <div className="aboutBottom">
        <div className="aboutContent">
          <div className="about-label">Our Story</div>
          <h1>
            About
            <span>Us</span>
          </h1>
          <div className="about-divider"></div>
          <p>
            At <strong>GameXpress</strong>, we bring you the best collection of PS4 and PC game CDs 
            at unbeatable prices. Whether you're a casual gamer or a hardcore 
            enthusiast, we ensure a seamless shopping experience with fast 
            delivery and genuine products. Explore our growing catalog and 
            level up your gaming journey today!
          </p>
          <div className="about-features">
            <div className="about-feature-card">
              <div className="feature-icon">🎮</div>
              <div className="feature-title">Genuine Games</div>
              <div className="feature-text">100% authentic PS4 &amp; PC titles, no piracy, ever.</div>
            </div>
            <div className="about-feature-card">
              <div className="feature-icon">⚡</div>
              <div className="feature-title">Fast Delivery</div>
              <div className="feature-text">Swift nationwide shipping straight to your door.</div>
            </div>
            <div className="about-feature-card">
              <div className="feature-icon">💎</div>
              <div className="feature-title">Best Prices</div>
              <div className="feature-text">Competitive pricing with regular deals and drops.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;