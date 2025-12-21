import React, { useState } from 'react';
import Logo from '../assets/pizzaLogo.png'; // This will be your GameXpress logo
import { Link } from "react-router-dom";
import ReorderIcon from '@mui/icons-material/Reorder';
import CloseIcon from '@mui/icons-material/Close';
import '../styles/NavBar.css';

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="leftSide">
          <Link to="/">
            <img src={Logo} alt="GameXpress Logo" className="logo" />
          </Link>
        </div>

        <div className="rightSide">
          {/* Desktop & Mobile Links */}
          <div className={isMobile ? "nav-links-mobile" : "nav-links"}>
            <Link to="/" onClick={() => setIsMobile(false)}>Home</Link>
            <Link to="/Items" onClick={() => setIsMobile(false)}>Items</Link>
            <Link to="/about" onClick={() => setIsMobile(false)}>About</Link>
            <Link to="/contact" onClick={() => setIsMobile(false)}>Contact</Link>
          </div>

          {/* Toggle Button for Mobile */}
          <button className="mobile-menu-icon" onClick={toggleMobileMenu}>
            {isMobile ? <CloseIcon /> : <ReorderIcon />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;