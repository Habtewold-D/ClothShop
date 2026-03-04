// src/pages/Contact.js
import React from 'react';
import './Contact.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FaFacebookF, FaInstagram, FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';

const Contact = () => {
  return (
    <div className="contact-majestic-hero">
      {/* Cinematic Background */}
      <div className="contact-hero-bg-container">
        <img src="/assets/images/contact-hero.png" alt="Bernos Boutique" className="contact-hero-img" />
        <div className="contact-hero-dark-overlay"></div>
      </div>

      {/* Floating Boutique Content (No Card) */}
      <div className="contact-content-wrapper">
        <div className="boutique-contact-content">
          <header className="boutique-header-direct">
            <h1 className="brand-font">Get in Touch</h1>
            <p className="boutique-subtitle">Experience the art of Ethiopian craftsmanship first-hand.</p>
          </header>

          <div className="boutique-info-flex">
            <div className="info-item-direct">
              <div className="info-icon-gold"><FaPhone /></div>
              <div className="info-text-group">
                <span className="info-category">Phone</span>
                <a href="tel:+251910752375" className="info-value-light">+251 910 75 23 75</a>
              </div>
            </div>

            <div className="info-item-direct">
              <div className="info-icon-gold"><FaEnvelope /></div>
              <div className="info-text-group">
                <span className="info-category">Email</span>
                <a href="mailto:info@bernosdesign.com" className="info-value-light">info@bernosdesign.com</a>
              </div>
            </div>

            <div className="info-item-direct">
              <div className="info-icon-gold"><FaMapMarkerAlt /></div>
              <div className="info-text-group">
                <span className="info-category">The Atelier</span>
                <p className="info-value-text-light">CMC Michael, MH Business Center<br />Addis Ababa, Ethiopia</p>
              </div>
            </div>
          </div>

          <footer className="boutique-footer-direct">
            <span className="social-invitation">Follow Our Heritage Journey</span>
            <div className="boutique-social-links-light">
              <a href="https://www.facebook.com/profile.php?id=61563400389331" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://www.instagram.com/bernosdesign2024" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://www.tiktok.com/@bernosdesign" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
              <a href="https://t.me/Bernosdesign2016" target="_blank" rel="noopener noreferrer"><FaTelegram /></a>
              <a href="https://wa.me/251910752375" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Contact;
