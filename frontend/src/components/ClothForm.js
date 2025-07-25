import React, { useState, useRef } from 'react';
import './ClothForm.css';

const categories = [
  "Women's Clothes",
  "Family Clothes",
  "GABI/NETELA",
  "Couple Clothes",
  "Children's Clothes",
  "Male Clothes",
  "Bernos",
  "Fota"
];

const ClothForm = ({ initialData = {}, onSubmit, onClose, loading }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [price, setPrice] = useState(initialData.price || '');
  const [discountedPrice, setDiscountedPrice] = useState(initialData.discountedPrice || '');
  const [category, setCategory] = useState(initialData.category || categories[0]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(initialData.imageUrl || '');
  const [popular, setPopular] = useState(initialData.popular || false);
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price || !category || (!image && !initialData.imageUrl)) return;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('discountedPrice', discountedPrice);
    formData.append('category', category);
    formData.append('popular', popular);
    if (image) formData.append('image', image);
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
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          <button type="button" onClick={() => fileInputRef.current.click()}>
            {preview ? 'Change Image' : 'Upload Image'}
          </button>
          {preview && <img className="image-preview" src={preview} alt="Preview" />}
          <button type="submit" disabled={loading}>{loading ? 'Saving...' : (initialData._id ? 'Save Changes' : 'Add Cloth')}</button>
        </form>
      </div>
    </div>
  );
};

export default ClothForm; 