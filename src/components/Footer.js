import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">GameXpress</div>
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/Items">Items</Link>
        <Link to="/About">About</Link>
        <Link to="/Contact">Contact</Link>
      </div>
      <div className="socialMedia">
        <InstagramIcon />
        <FacebookIcon />
        <TwitterIcon />
        <LinkedInIcon />
      </div>
      <p>&copy; 2025 <span>GameXpress</span> — Level Up Your Gaming Experience</p>
    </footer>
  );
}

export default Footer;