// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaTelegram } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Phone: +251910752375</p>
          <p>Email: info@bernosdesign.com</p>
          <p>Address: CMC Michael, MH Business Center, Addis Ababa, Ethiopia</p>
        </div>
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/profile.php?id=61563400389331&mibextid=wwXIfr&mibextid=wwXIfr" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://www.instagram.com/bernosdesign2024?igsh=MWJtbzNoYjd3MGRqZg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.tiktok.com/@bernosdesign" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
            <a href="https://t.me/Bernosdesign2016" target="_blank" rel="noopener noreferrer"><FaTelegram /></a>
          </div>
        </div>
      </div>
      <p className="footer-bottom">&copy; 2025 Bernos Design. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
