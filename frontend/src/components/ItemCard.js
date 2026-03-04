import React, { useState } from 'react';
import './ItemCard.css';

const ItemCard = ({ item, isAdmin, onEdit, onDelete }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const price = Number(item.price);
  const discounted = item.discountedPrice ? Number(item.discountedPrice) : null;
  const hasDiscount = !!discounted;

  const images = Array.isArray(item.images) && item.images.length > 0 ? item.images : [item.imageUrl];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="item-card-premium">
      {isAdmin && (
        <div className="admin-controls-glass">
          <button className="edit-btn-icon" onClick={onEdit} title="Edit">✎</button>
          <button className="delete-btn-icon" onClick={onDelete} title="Delete">×</button>
        </div>
      )}

      <div className="card-media-wrapper">
        <img
          src={typeof images[currentImageIndex] === 'string' ? images[currentImageIndex] : images[currentImageIndex]?.url}
          alt={item.title}
          className="item-image-premium"
        />

        {images.length > 1 && (
          <div className="carousel-nav-premium">
            <button className="nav-btn-mini" onClick={(e) => { e.stopPropagation(); prevImage(); }}>‹</button>
            <div className="nav-dots-mini">
              {images.map((_, i) => (
                <span key={i} className={`dot-mini ${i === currentImageIndex ? 'active' : ''}`} />
              ))}
            </div>
            <button className="nav-btn-mini" onClick={(e) => { e.stopPropagation(); nextImage(); }}>›</button>
          </div>
        )}
      </div>

      <div className="card-details-premium">
        <h3 className="item-title-premium">{item.title}</h3>
        <div className="price-box-premium">
          {hasDiscount ? (
            <>
              <span className="price-disc">ETB {discounted}</span>
              <span className="price-orig">ETB {price}</span>
            </>
          ) : (
            <span className="price-curr">ETB {price}</span>
          )}
        </div>
      </div>
      <div className="tibeb-accent-line"></div>
    </div>
  );
};

export default ItemCard;
