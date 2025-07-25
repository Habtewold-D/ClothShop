// src/pages/Home.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const categories = [
    { title: "Women's Clothes", image: "assets/images/women1.webp", link: "/shop?category=Women's%20Clothes" },
    { title: "Family Clothes", image: "assets/images/family3.jpg", link: "/shop?category=Family%20Clothes" },
    { title: "GABI/NETELA", image: "/assets/images/gabi1.webp", link: "/shop?category=GABI/NETELA" },
    { title: "Couple Clothes", image: "/assets/images/couple8.webp", link: "/shop?category=Couple%20Clothes" },
    { title: "Children's Clothes", image: "/assets/images/child3.webp", link: "/shop?category=Children's%20Clothes" },
    { title: "Male Clothes", image: "assets/images/men1.webp", link: "/shop?category=Male%20Clothes" },
    { title: "Bernos", image: "/assets/images/Bernos.png", link: "/shop?category=Bernos" },
    { title: "Fota", image: "/assets/images/cloth.jpg", link: "/shop?category=Fota" }
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
