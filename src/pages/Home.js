import React from 'react';
import { Link } from "react-router-dom";
import Banner2 from '../assets/Banner2.jpg';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${Banner2})` }}>
      <div className="headerContainer">
        <h1 className="hero-title">GameXpress</h1>
        <p className="hero-subtitle">Where Every Game Finds a Player</p>
        <Link to="/Items">
          <button className="hero-btn">Order Now</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;