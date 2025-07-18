// src/pages/Home.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const categories = [
    { title: "Women's Clothes", image: "assets/images/women1.webp", link: "/shop?page=2" },
    { title: "Family Clothes", image: "assets/images/family3.jpg", link: "/shop?page=3" },
    { title: "GABI/NETELA", image: "/assets/images/gabi1.webp", link: "/shop?page=4" },
    { title: "Couple Clothes", image: "/assets/images/couple8.webp", link: "/shop?page=5" },
    { title: "Children's Clothes", image: "/assets/images/child3.webp", link: "/shop?page=6" },
    { title: "Male Clothes", image: "assets/images/men1.webp", link: "/shop?page=7" }
  ];

  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>Welcome to Bernos Design</h1>
      <div className="category-container">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <img src={category.image} alt={category.title} />
            <h3>{category.title}</h3>
            <button
              className="shop-button"
              onClick={() => navigate(`/shop?category=${encodeURIComponent(category.title)}`)}
            >
              Shop Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
