import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const categories = [
    { title: "Women's Clothes", image: "assets/images/women.jpg", categoryValue: "Women's Clothes" },
    { title: "Family Clothes", image: "assets/images/family.jpg", categoryValue: "Family Clothes" },
    { title: "GABI/NETELA/KUTA", image: "/assets/images/gabi1.webp", categoryValue: "GABI/NETELA" },
    { title: "Couple Clothes", image: "/assets/images/couple.jpg", categoryValue: "Couple Clothes" },
    { title: "Kids Clothes", image: "/assets/images/child3.webp", categoryValue: "Kids Clothes" },
    { title: "ነጭ በነጭ", image: "/assets/images/nechbenech.jpg", categoryValue: "ነጭ በነጭ" },
    { title: "Male Clothes", image: "assets/images/men.jpg", categoryValue: "Male Clothes" },
    { title: "BERNOS", image: "/assets/images/bernos.jpg", categoryValue: "Bernos" },
    { title: "FOTA", image: "/assets/images/fota.webp", categoryValue: "Fota" }
  ];

  const navigate = useNavigate();

  return (
    <div className="home-redesign">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-image-container">
          <img src="/assets/images/hero-bg.jpg" alt="Ethiopian Traditional Excellence" className="hero-bg" />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <span className="hero-subtitle">Authentic Craftsmanship</span>
          <h1 className="hero-title">Bernos Design</h1>
          <p className="hero-description">Experience the timeless elegance of Ethiopian traditional clothing, hand-woven with heritage and pride.</p>
          <button className="btn-premium" onClick={() => navigate('/shop')}>Explore Collection</button>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="categories-section">
        <div className="section-header">
          <h2 className="tibeb-border">Our Collections</h2>
          <p>Hand-picked selections of our finest attire</p>
        </div>
        <div className="category-grid-premium">
          {categories.map((category, index) => (
            <div
              key={index}
              className="category-card-premium"
              onClick={() => navigate(`/shop?category=${encodeURIComponent(category.categoryValue)}`)}
            >
              <div className="card-image-wrapper">
                <img src={category.image} alt={category.title} />
              </div>
              <div className="card-content-overlay">
                <h3>{category.title}</h3>
                <span className="shop-link-btn">SHOP COLLECTION</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Heritage Spotlight Section */}
      <section className="heritage-spotlight">
        <div className="spotlight-inner">
          <div className="spotlight-image-box">
            <img src="/assets/images/bernos.jpg" alt="The Art of Tibeb" className="spotlight-img" />
            <div className="spotlight-frame"></div>
          </div>
          <div className="spotlight-content-box">
            <span className="spotlight-label">The Art of Tibeb</span>
            <h2 className="brand-font">Heritage in Every Thread</h2>
            <div className="spotlight-divider"></div>
            <p className="spotlight-text">
              Every pattern tells a story. At Bernos Design, we preserve the ancient art of hand-weaving,
              ensuring every thread carries the spirit of Ethiopia. Our garments are more than fashion;
              they are wearable history.
            </p>
            <button className="btn-heritage-outline" onClick={() => navigate('/about')}>Discover Our Story</button>
          </div>
        </div>
      </section>

      {/* Majestic Philosophy Quote */}
      <section className="majestic-philosophy">
        <div className="philosophy-container">
          <div className="philosophy-accent-top">“</div>
          <p className="brand-font philosophy-quote">
            True luxury is the preservation of identity.
            We don’t just sell clothing; we invite you to wear your heritage.
          </p>
          <div className="philosophy-accent-bottom">”</div>
        </div>
      </section>
    </div>
  );
};

export default Home;
