import React from 'react';
import './ItemCard.css'; // Make sure you import your styles

const ItemCard = ({ item }) => {
  return (
    <div className="item-card">
      <img src={item.image} alt={item.title} />
      <h2>{item.title}</h2>
      <div className="price-container">
        <span className="discounted-price">{item.discountedPrice}</span>
        <span className="original-price">{item.price}</span>
      </div>
    </div>
  );
};

export default ItemCard;
