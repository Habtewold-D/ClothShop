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
          <h1>About the Company</h1>
          
          {/* Company Overview */}
          <div className="section">
            <h3>Company Overview</h3>
            <ul>
              <li><strong>Name:</strong> Bernos Design</li>
              <li><strong>Established:</strong> 2016E.C</li>
            </ul>
          </div>

          {/* Mission Statement */}
          <div className="section">
            <h3>Mission Statement</h3>
            <p>
              Our mission is to celebrate and promote Ethiopian culture through the sale of traditional clothing, providing <strong>high-quality, authentic garments</strong> that reflect the rich heritage and artistry of Ethiopia.
            </p>
          </div>

          {/* Vision Statement */}
          <div className="section">
            <h3>Vision Statement</h3>
            <p>
              To be the <strong>leading retailer</strong> of Ethiopian traditional clothing, recognized for our commitment to <strong>quality</strong>, <strong>cultural preservation</strong>, and customer satisfaction.
            </p>
          </div>

          {/* Values */}
          <div className="section">
            <h3>Values</h3>
            <ul className="values-list">
              <li><strong>Authenticity</strong></li>
              <li><strong>Passion</strong></li>
              <li><strong>Integrity</strong></li>
              <li><strong>Cultural appreciation</strong></li>
              <li><strong>Quality</strong></li>
            </ul>
          </div>

          {/* Closing Statement */}
          <div className="section">
            <p>
              At <strong>Bernos Design</strong>, we are passionate about sharing the beauty of Ethiopian traditional clothing with the world. Our commitment to <strong>quality</strong>, <strong>authenticity</strong>, and <strong>cultural appreciation</strong> sets us apart in the market. We invite you to join us on this journey of celebrating Ethiopian heritage through fashion.
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
