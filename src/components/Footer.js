// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaTelegram } from 'react-icons/fa';

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
          <p>Phone: +123 456 789</p>
          <p>Email: info@bernosdesign.com</p>
          <p>Address: 123, Addis Ababa, Ethiopia</p>
        </div>
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            <a href="https://t.me" target="_blank" rel="noopener noreferrer"><FaTelegram /></a>
          </div>
        </div>
      </div>
      <p className="footer-bottom">&copy; 2025 Bernos Design. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
