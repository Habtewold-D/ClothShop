// src/pages/Home.js
import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const categories = [
    { title: "Women's Clothes", image: "assets/images/cloth.jpg", link: "/shop/womens" },
    { title: "Family Clothes", image: "../../public/assets/images/family_cloth.jpg", link: "/shop/family" },
    { title: "GABI/NETELA", image: "../../public/assets/images/gabi.jpg", link: "/shop/gabi" },
    { title: "Children's Clothes", image: "../../public/assets/images/children_cloth.jpg", link: "/shop/children" },
    { title: "Male Clothes", image: "../../public/assets/images/male_cloth.jpg", link: "/shop/male" },
    { title: "Couple Clothes", image: "../../public/assets/images/couple_cloth.jpg", link: "/shop/couple" }
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
