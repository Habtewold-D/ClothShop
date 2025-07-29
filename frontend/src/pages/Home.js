// src/pages/Home.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const categories = [
    { title: "Women's Clothes", image: "assets/images/women1.webp", categoryValue: "Women's Clothes" },
    { title: "Family Clothes", image: "assets/images/family3.jpg", categoryValue: "Family Clothes" },
    { title: "GABI/NETELA/KUTA", image: "/assets/images/gabi1.webp", categoryValue: "GABI/NETELA" },
    { title: "Couple Clothes", image: "/assets/images/couple8.webp", categoryValue: "Couple Clothes" },
    { title: "Children's Clothes", image: "/assets/images/child3.webp", categoryValue: "Children's Clothes" },
    { title: "Male Clothes", image: "assets/images/men1.webp", categoryValue: "Male Clothes" },
    { title: "BERNOS", image: "/assets/images/bernos.jpg", categoryValue: "Bernos" },
    { title: "FOTA", image: "/assets/images/fota.webp", categoryValue: "Fota" }
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
              onClick={() => navigate(`/shop?category=${encodeURIComponent(category.categoryValue)}`)}
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
