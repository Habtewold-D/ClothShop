// src/pages/Contact.js
import React from 'react';
import './Contact.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FaFacebookF, FaInstagram, FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';

const Contact = () => {
  return (
    <div className="contact-refined-page">
      <div className="contact-hero-section">
        <h1 className="brand-font">Get in Touch</h1>
        <div className="hero-tibeb-line"></div>
        <p className="contact-hero-desc">Reach out for any inquiries or custom designs.</p>
      </div>

      <div className="contact-tiles-container">
        <div className="contact-mini-tile">
          <div className="tile-icon"><FaPhone /></div>
          <h3 className="brand-font">Call Us</h3>
          <a href="tel:+251910752375" className="tile-link">+251 910 75 23 75</a>
        </div>

        <div className="contact-mini-tile">
          <div className="tile-icon"><FaEnvelope /></div>
          <h3 className="brand-font">Email</h3>
          <a href="mailto:info@bernosdesign.com" className="tile-link">info@bernosdesign.com</a>
        </div>

        <div className="contact-mini-tile">
          <div className="tile-icon"><FaMapMarkerAlt /></div>
          <h3 className="brand-font">Visit Us</h3>
          <p className="tile-text">CMC Michael, MH Business Center<br />Addis Ababa, Ethiopia</p>
        </div>
      </div>

      <div className="contact-social-section">
        <h2 className="brand-font">Find us on Social Media</h2>
        <div className="social-icon-row">
          <a href="https://www.facebook.com/profile.php?id=61563400389331" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://www.instagram.com/bernosdesign2024" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://www.tiktok.com/@bernosdesign" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
          <a href="https://t.me/Bernosdesign2016" target="_blank" rel="noopener noreferrer"><FaTelegram /></a>
          <a href="https://wa.me/251910752375" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
