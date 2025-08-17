// src/pages/Contact.js
import React from 'react';
import './Contact.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';

const Contact = () => {
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <div className="contact-info">
        <div className="contact-item">
          <FaPhone />
          <p>+251910752375</p>
        </div>
        <div className="contact-item">
          <FaEnvelope />
          <p>info@bernosdesign.com</p>
        </div>
        <div className="contact-item">
          <FaMapMarkerAlt />
          <p>CMC Michael, MH Business Center, Addis Ababa, Ethiopia</p>
        </div>
      </div>
      <div className="social-media">
        <h3>Follow Us:</h3>
        <div className="social-icons">
          <a href="https://www.facebook.com/profile.php?id=61563400389331&mibextid=wwXIfr&mibextid=wwXIfr" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://www.instagram.com/bernosdesign2024?igsh=MWJtbzNoYjd3MGRqZg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://www.tiktok.com/@bernosdesign" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
          <a href="https://t.me/Bernosdesign2016" target="_blank" rel="noopener noreferrer"><FaTelegram /></a>
          <a href="https://wa.me/251910752375" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
