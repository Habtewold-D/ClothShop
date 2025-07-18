import React from 'react';
import './ItemCard.css'; // Make sure you import your styles

const ItemCard = ({ item, isAdmin, onEdit, onDelete }) => {
  const price = Number(item.price);
  const discounted = item.discountedPrice ? Number(item.discountedPrice) : (price * 0.85).toFixed(2);
  const hasDiscount = item.discountedPrice || (!item.discountedPrice && price !== discounted);

  return (
    <div className="item-card">
      {isAdmin && (
        <div className="admin-controls">
          <button className="edit-btn" onClick={onEdit}>Edit</button>
          <button className="delete-btn" onClick={onDelete}>Delete</button>
        </div>
      )}
      <img src={item.imageUrl} alt={item.title} />
      <h2>{item.title}</h2>
      <div className="price-container">
        {hasDiscount ? (
          <>
            <span className="discounted-price">${discounted}</span>
            <span className="original-price" style={{ textDecoration: 'line-through', color: '#888', marginLeft: 8 }}>${price}</span>
          </>
        ) : (
          <span className="discounted-price">${price}</span>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
