// src/components/ItemCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ItemCard.css';

const ItemCard = ({ item }) => {
  return (
    <div className="item-card">
      <img src={item.image} alt={item.title} />
      <div className="item-info">
        <h3>{item.title}</h3>
        <p>{item.price}</p>
        <Link to={`/shop/${item.id}`}>View Details</Link>
      </div>
    </div>
  );
};

export default ItemCard;
