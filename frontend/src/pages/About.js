// src/pages/About.js
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-majestic-fullpage">
      {/* Universal Cinematic Background */}
      <div className="about-fixed-bg">
        <img src="/assets/images/about-hero.png" alt="Heritage Craftsmanship" className="about-bg-img" />
        <div className="about-gradient-overlay"></div>
      </div>

      <div className="about-scroll-content">
        {/* Main Header */}
        <header className="about-story-header">
          <h1 className="brand-font">About the Company</h1>
          <div className="story-separator"></div>
          <p className="hero-philosophy">Preserving Heritage, Crafting Excellence</p>
        </header>

        {/* Modular Story Sections (Overlaid) */}
        <div className="story-modules-container">
          {/* Overview */}
          <section className="story-module-direct overview-section">
            <h2 className="brand-font-gold">Company Overview</h2>
            <div className="direct-details">
              <p><strong>Name</strong> Bernos Design</p>
              <p><strong>Established</strong> 2016E.C</p>
            </div>
          </section>

          {/* Mission & Vision */}
          <div className="story-split-grid">
            <section className="story-module-direct">
              <h2 className="brand-font-gold">Mission Statement</h2>
              <p className="story-text-light">
                Our mission is to celebrate and promote Ethiopian culture through the sale of traditional clothing,
                providing high-quality, authentic garments.
              </p>
            </section>

            <section className="story-module-direct">
              <h2 className="brand-font-gold">Vision Statement</h2>
              <p className="story-text-light">
                To be the leading retailer of Ethiopian traditional clothing, recognized for our commitment to quality
                and cultural preservation.
              </p>
            </section>
          </div>

          {/* Values */}
          <section className="story-module-direct values-section">
            <h2 className="brand-font-gold">Our Values</h2>
            <div className="values-identity-row">
              {['Authenticity', 'Passion', 'Integrity', 'Cultural Appreciation', 'Quality'].map(value => (
                <span key={value} className="heritage-pill">{value}</span>
              ))}
            </div>
          </section>
        </div>

        {/* Closing Quote */}
        <footer className="about-story-closing">
          <div className="closing-quote-wrapper">
            <p className="philosophy-quote-main">
              At <strong>Bernos Design</strong>, we are passionate about sharing the beauty of Ethiopian traditional clothing with the world.
              Our commitment to quality, authenticity, and cultural appreciation sets us apart.
              We invite you to join us on this journey.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default About;
