// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const categories = [
    { title: "Women's Clothes", image: "assets/images/cloth.jpg", link: "/shop?page=2" },
    { title: "Family Clothes", image: "assets/images/family_cloth.jpg", link: "/shop?page=3" },
    { title: "GABI/NETELA", image: "assets/images/gabi.jpg", link: "/shop?page=4" },
    { title: "Couple Clothes", image: "assets/images/couple_cloth.jpg", link: "/shop?page=5" },
    { title: "Children's Clothes", image: "assets/images/children_cloth.jpg", link: "/shop?page=6" },
    { title: "Male Clothes", image: "assets/images/male_cloth.jpg", link: "/shop?page=7" }
  ];

  return (
    <div className="home">
      <h1>Welcome to Bernos Design</h1>
      <div className="category-container">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <img src={category.image} alt={category.title} />
            <h3>{category.title}</h3>
            <Link to={category.link}>
              <button className="shop-button">Shop Now</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
