// src/components/CategoryCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryCard.css';

const CategoryCard = ({ title, image }) => {
  return (
    <div className="category-card">
      <img src={image} alt={title} />
      <div className="category-info">
        <h2>{title}</h2>
        <Link to={`/shop#${title.replace(/\s+/g, '').toLowerCase()}`}>Shop Now</Link>
      </div>
    </div>
  );
};

export default CategoryCard;
