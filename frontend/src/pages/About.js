// src/pages/About.js
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <div className="about-content">
        <div className="about-image">
          <img src="/assets/images/bernos Logo.jpg" alt="Bernos Logo" />
        </div>
        <div className="about-text">
          <h1>About Bernos Design</h1>
          <p>
            Bernos Design offers a wide variety of traditional Ethiopian clothing, 
            designed with cultural elegance and modern flair. Our clothes are made 
            from high-quality fabrics, ensuring that every piece is both beautiful and durable.
          </p>
          <p>
            We believe in preserving tradition while embracing contemporary style, 
            creating a collection that celebrates Ethiopia’s rich heritage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
