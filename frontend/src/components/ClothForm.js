import React, { useState, useRef } from 'react';
import './ClothForm.css';

import { useImageManager } from '../hooks/useImageManager';

const categories = [
  "Women's Clothes",
  "Family Clothes",
  "GABI/NETELA",
  "Couple Clothes",
  "Kids Clothes",
  "Male Clothes",
  "Bernos",
  "Fota"
];

const ClothForm = ({ initialData = {}, onSubmit, onClose, loading }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [price, setPrice] = useState(initialData.price || '');
  const [discountedPrice, setDiscountedPrice] = useState(initialData.discountedPrice || '');
  const [category, setCategory] = useState(initialData.category || categories[0]);
  const [popular, setPopular] = useState(initialData.popular || false);
  const [seasonal, setSeasonal] = useState(initialData.seasonal || false);
  const fileInputRef = useRef();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const {
    previews,
    imageStates,
    addImages,
    replaceImage,
    removeImage
  } = useImageManager(initialData.images || []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      if (selectedImageIndex !== null) {
        replaceImage(selectedImageIndex, files[0]);
        setSelectedImageIndex(null);
      } else {
        addImages(files);
      }
    }
    e.target.value = '';
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    fileInputRef.current.click();
  };

  const handleRemoveImage = (index) => {
    removeImage(index);
    if (selectedImageIndex === index) {
      setSelectedImageIndex(null);
    } else if (selectedImageIndex > index) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleAddImages = () => {
    setSelectedImageIndex(null);
    setTimeout(() => {
      fileInputRef.current.click();
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price || !category || previews.length === 0) return;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('discountedPrice', discountedPrice);
    formData.append('category', category);
    formData.append('popular', popular);
    formData.append('seasonal', seasonal);

    if (initialData._id) {
      formData.append('_id', initialData._id);

      imageStates.forEach((state) => {
        if (state.type === 'original') {
          // Send stringified object if it's new structure, or just string if old
          const dataToSend = typeof state.data === 'string' ? state.data : JSON.stringify(state.data);
          formData.append('existingImages', dataToSend);
        } else if (state.type === 'replaced' || state.type === 'additional') {
          formData.append('images', state.file);
        }
      });
    } else {
      imageStates.forEach(state => {
        if (state.file) {
          formData.append('images', state.file);
        }
      });
    }

    onSubmit(formData);
  };

  return (
    <div className="cloth-form-modal">
      <div className="cloth-form-container">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>{initialData._id ? 'Edit Cloth' : 'Add Cloth'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Discounted Price"
            value={discountedPrice}
            onChange={e => setDiscountedPrice(e.target.value)}
          />
          <select value={category} onChange={e => setCategory(e.target.value)} required>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <label className="popular-checkbox">
            <input
              type="checkbox"
              checked={popular}
              onChange={e => setPopular(e.target.checked)}
            />
            Popular
          </label>
          <label className="seasonal-checkbox">
            <input
              type="checkbox"
              checked={seasonal}
              onChange={e => setSeasonal(e.target.checked)}
            />
            Seasonal
          </label>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: 'none' }}
            multiple={selectedImageIndex === null}
          />
          <button type="button" onClick={handleAddImages}>
            {previews.length > 0 ? 'Add Images' : 'Upload Images'}
          </button>
          {previews.length > 0 && (
            <div className="image-preview-multi">
              {previews.map((src, idx) => (
                <div key={idx} className="image-preview-container">
                  <img
                    className={`image-preview ${selectedImageIndex === idx ? 'selected' : ''}`}
                    src={src}
                    alt={`Preview ${idx + 1}`}
                    onClick={() => handleImageClick(idx)}
                  />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage(idx);
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          <button type="submit" disabled={loading}>{loading ? 'Saving...' : (initialData._id ? 'Save Changes' : 'Add Cloth')}</button>
        </form>
      </div>
    </div>
  );
};

export default ClothForm; 