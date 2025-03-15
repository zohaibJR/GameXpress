import React from 'react'
import { Link } from "react-router-dom";
import Banner from '../assets/pizza.jpg'
import '../styles/Home.css'

function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${Banner})` }}>
      <div className="headerContainer" >
        <h1>GameXpress</h1>
        <p>Where Every Game Finds a Player</p>
        <Link to="/Items"> {/* ✅ Fixed extra space */}
          <button>Order Now</button>
        </Link>
      </div>
    </div>
  );
}

export default Home