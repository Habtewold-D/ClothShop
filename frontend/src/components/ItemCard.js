import React, { useState } from 'react';
import './ItemCard.css';

const ItemCard = ({ item, isAdmin, onEdit, onDelete }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const price = Number(item.price);
  const discounted = item.discountedPrice ? Number(item.discountedPrice) : (price * 0.85).toFixed(2);
  const hasDiscount = item.discountedPrice || (!item.discountedPrice && price !== discounted);

  const images = Array.isArray(item.images) && item.images.length > 0 ? item.images : [item.imageUrl];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="item-card">
      {isAdmin && (
        <div className="admin-controls">
          <button className="edit-btn" onClick={onEdit}>Edit</button>
          <button className="delete-btn" onClick={onDelete}>Delete</button>
        </div>
      )}
      <div className="item-image-carousel">
        <img 
          src={images[currentImageIndex]} 
          alt={item.title + ' ' + (currentImageIndex + 1)} 
          className="item-image-main"
        />
        {images.length > 1 && (
          <>
            <button className="carousel-btn prev-btn" onClick={prevImage}>
              ‹
            </button>
            <button className="carousel-btn next-btn" onClick={nextImage}>
              ›
            </button>
            <div className="carousel-dots">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => goToImage(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <h2>{item.title}</h2>
      <div className="price-container">
        {hasDiscount ? (
          <>
            <span className="discounted-price">ETB {discounted}</span>
            <span className="original-price" style={{ textDecoration: 'line-through', color: '#888', marginLeft: 8 }}>ETB {price}</span>
          </>
        ) : (
          <span className="discounted-price">ETB {price}</span>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
