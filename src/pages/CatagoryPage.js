// src/pages/Contact.js
import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <p>Phone: +251 912 345 678</p>
      <p>Email: info@bernosdesign.com</p>
      <p>Address: Addis Ababa, Ethiopia</p>
      <div className="social-media">
        <a href="https://www.tiktok.com/@bernosdesign" target="_blank" rel="noopener noreferrer">TikTok</a>
        <a href="https://www.youtube.com/bernosdesign" target="_blank" rel="noopener noreferrer">YouTube</a>
        <a href="https://t.me/bernosdesign" target="_blank" rel="noopener noreferrer">Telegram</a>
      </div>
    </div>
  );
};

export default Contact;
