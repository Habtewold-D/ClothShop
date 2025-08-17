// src/pages/Home.js
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import { API_BASE_URL } from '../api';

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

  // Warm-up backend on initial load (non-blocking)
  useEffect(() => {
    let cancelled = false;
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));
    const warm = async () => {
      for (let i = 0; i < 2; i++) { // 2 attempts
        const controller = new AbortController();
        const t = setTimeout(() => controller.abort(), 5000); // 5s timeout
        try {
          await fetch(`${API_BASE_URL}/health`, { method: 'GET', keepalive: true, signal: controller.signal });
          clearTimeout(t);
          break; // warmed
        } catch (e) {
          clearTimeout(t);
          if (cancelled) break;
          await delay(1000 * (i + 1)); // backoff 1s, 2s
        }
      }
    };
    warm();
    return () => { cancelled = true; };
  }, []);

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
