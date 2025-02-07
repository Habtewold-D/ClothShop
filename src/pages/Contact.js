// src/pages/Contact.js
import React from 'react';
import './Contact.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaTelegram } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <div className="contact-info">
        <div className="contact-item">
          <FaPhone />
          <p>+123 456 789</p>
        </div>
        <div className="contact-item">
          <FaEnvelope />
          <p>info@bernosdesign.com</p>
        </div>
        <div className="contact-item">
          <FaMapMarkerAlt />
          <p>123, Addis Ababa, Ethiopia</p>
        </div>
      </div>
      <div className="social-media">
        <h3>Follow Us:</h3>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          <a href="https://t.me" target="_blank" rel="noopener noreferrer"><FaTelegram /></a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
