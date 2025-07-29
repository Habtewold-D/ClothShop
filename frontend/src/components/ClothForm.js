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
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState(initialData.images || []);
  const [popular, setPopular] = useState(initialData.popular || false);
  const [seasonal, setSeasonal] = useState(initialData.seasonal || false);
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    if (files.length > 0) {
      const newPreviews = files.map(file => {
        const reader = new FileReader();
        return new Promise(resolve => {
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      });
      Promise.all(newPreviews).then(setPreviews);
    } else {
      setPreviews([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price || !category || (images.length === 0 && (!initialData.images || initialData.images.length === 0))) return;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('discountedPrice', discountedPrice);
    formData.append('category', category);
    formData.append('popular', popular);
    formData.append('seasonal', seasonal);
    images.forEach(img => formData.append('images', img));
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
            multiple
          />
          <button type="button" onClick={() => fileInputRef.current.click()}>
            {previews.length > 0 ? 'Change Images' : 'Upload Images'}
          </button>
          {previews.length > 0 && (
            <div className="image-preview-multi">
              {previews.map((src, idx) => (
                <img key={idx} className="image-preview" src={src} alt={`Preview ${idx + 1}`} />
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