import React, { useState, useEffect } from 'react';
import Logo from '../assets/pizzaLogo.png';
import { Link, useLocation } from "react-router-dom";
import ReorderIcon from '@mui/icons-material/Reorder';
import CloseIcon from '@mui/icons-material/Close';
import '../styles/NavBar.css';

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobile(false);
  }, [location]);

  // Add scrolled class for extra blur/shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/',        label: 'Home'    },
    { path: '/Items',   label: 'Items'   },
    { path: '/About',   label: 'About'   },
    { path: '/Contact', label: 'Contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="nav-container">

        {/* Logo */}
        <div className="leftSide">
          <Link to="/">
            <img src={Logo} alt="GameXpress Logo" className="logo" />
          </Link>
        </div>

        {/* Desktop links */}
        <div className="rightSide">
          <div className="nav-links">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={location.pathname === path ? 'nav-link active' : 'nav-link'}
              >
                {label}
              </Link>
            ))}
            <Link to="/Items" className="nav-cta">
              Shop Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="mobile-menu-icon"
            onClick={() => setIsMobile(prev => !prev)}
            aria-label={isMobile ? 'Close menu' : 'Open menu'}
          >
            {isMobile ? <CloseIcon /> : <ReorderIcon />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isMobile && (
        <div className="nav-links-mobile">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={location.pathname === path ? 'active' : ''}
              onClick={() => setIsMobile(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/Items"
            className="nav-mobile-cta"
            onClick={() => setIsMobile(false)}
          >
            Shop Now
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;