// src/pages/About.js
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-luxury-container">
      <header className="about-hero-minimal">
        <h1 className="brand-font tibeb-border">About the Company</h1>
        <p className="hero-tagline">Preserving Heritage, Crafting Excellence</p>
      </header>

      <div className="about-content-wrapper">
        {/* Visual Sidebar */}
        <div className="about-visual-side">
          <div className="brand-insignia-box">
            <img src="/assets/images/bernos Logo.jpg" alt="Bernos Design" className="brand-logo-main" />
            <div className="insignia-border-accent"></div>
          </div>
        </div>

        {/* Modular Info Grid */}
        <div className="about-info-grid">
          <div className="info-tile tile-overview">
            <h2 className="brand-font">Company Overview</h2>
            <div className="tile-content">
              <p><span>Name:</span> Bernos Design</p>
              <p><span>Established:</span> 2016E.C</p>
            </div>
          </div>

          <div className="info-tile">
            <h2 className="brand-font">Mission Statement</h2>
            <p className="tile-text">
              Our mission is to celebrate and promote Ethiopian culture through the sale of traditional clothing,
              providing high-quality, authentic garments that reflect the rich heritage and artistry of Ethiopia.
            </p>
          </div>

          <div className="info-tile">
            <h2 className="brand-font">Vision Statement</h2>
            <p className="tile-text">
              To be the leading retailer of Ethiopian traditional clothing, recognized for our commitment to quality,
              cultural preservation, and customer satisfaction.
            </p>
          </div>

          <div className="info-tile tile-values">
            <h2 className="brand-font">Values</h2>
            <div className="values-identity-cloud">
              {['Authenticity', 'Passion', 'Integrity', 'Cultural appreciation', 'Quality'].map(value => (
                <span key={value} className="identity-tag">{value}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="about-closing-card">
        <div className="closing-inner-content">
          <p>
            At <strong>Bernos Design</strong>, we are passionate about sharing the beauty of Ethiopian traditional clothing with the world.
            Our commitment to quality, authenticity, and cultural appreciation sets us apart in the market.
            We invite you to join us on this journey of celebrating Ethiopian heritage through fashion.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
