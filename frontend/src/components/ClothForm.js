import React, { useState, useRef } from 'react';
import './ClothForm.css';

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
  const [replacedImages, setReplacedImages] = useState(new Map()); // index -> file
  const [additionalImages, setAdditionalImages] = useState([]); // new images added
  const [previews, setPreviews] = useState(initialData.images || []);
  const [removedOriginalIndices, setRemovedOriginalIndices] = useState(new Set()); // track removed original images
  const [popular, setPopular] = useState(initialData.popular || false);
  const [seasonal, setSeasonal] = useState(initialData.seasonal || false);
  const fileInputRef = useRef();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  
  // Track the final state of images with their types
  const [imageStates, setImageStates] = useState(() => {
    if (initialData.images) {
      return initialData.images.map((url, index) => ({
        type: 'original',
        url: url,
        originalIndex: index
      }));
    }
    return [];
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 0) {
      if (selectedImageIndex !== null) {
        // Replace specific image
        const newReplacedImages = new Map(replacedImages);
        const newPreviews = [...previews];
        const newImageStates = [...imageStates];
        
        // Store the replacement
        newReplacedImages.set(selectedImageIndex, files[0]);
        setReplacedImages(newReplacedImages);
        
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews[selectedImageIndex] = reader.result;
          // Update image state to show it's replaced
          if (newImageStates[selectedImageIndex]) {
            newImageStates[selectedImageIndex] = {
              type: 'replaced',
              file: files[0],
              originalIndex: newImageStates[selectedImageIndex].originalIndex
            };
          }
          setPreviews(newPreviews);
          setImageStates(newImageStates);
          setSelectedImageIndex(null);
        };
        reader.readAsDataURL(files[0]);
      } else {
        // Add new images to existing ones
        const newAdditionalImages = [...additionalImages, ...files];
        setAdditionalImages(newAdditionalImages);
        
        const newPreviews = files.map(file => {
          const reader = new FileReader();
          return new Promise(resolve => {
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
          });
        });
        
        Promise.all(newPreviews).then(newPreviewUrls => {
          setPreviews([...previews, ...newPreviewUrls]);
          // Add new image states
          const newImageStates = [...imageStates, ...files.map(file => ({
            type: 'additional',
            file: file
          }))];
          setImageStates(newImageStates);
        });
      }
    }
    // Reset file input
    e.target.value = '';
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    fileInputRef.current.click();
  };

  const handleRemoveImage = (index) => {
    // Create new arrays/maps without the removed image
    const newPreviews = [...previews];
    const newReplacedImages = new Map(replacedImages);
    const newAdditionalImages = [...additionalImages];
    const newRemovedOriginalIndices = new Set(removedOriginalIndices);
    const newImageStates = [...imageStates];
    
    // Remove the image from previews and image states
    newPreviews.splice(index, 1);
    newImageStates.splice(index, 1);
    
    // Handle the removed image based on its type
    const originalImageCount = initialData.images ? initialData.images.length : 0;
    
    if (index < originalImageCount) {
      // This was an original image - mark it as removed
      newRemovedOriginalIndices.add(index);
      // Remove from replaced images if it was replaced
      newReplacedImages.delete(index);
    } else {
      // This was an additional image - remove from additional images
      const additionalIndex = index - originalImageCount;
      if (additionalIndex >= 0 && additionalIndex < newAdditionalImages.length) {
        newAdditionalImages.splice(additionalIndex, 1);
      }
    }
    
    // Update all state
    setPreviews(newPreviews);
    setReplacedImages(newReplacedImages);
    setAdditionalImages(newAdditionalImages);
    setRemovedOriginalIndices(newRemovedOriginalIndices);
    setImageStates(newImageStates);
    
    // Reset selected index if it was the removed image
    if (selectedImageIndex === index) {
      setSelectedImageIndex(null);
    } else if (selectedImageIndex > index) {
      // Adjust selected index if it was after the removed image
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleAddImages = () => {
    setSelectedImageIndex(null);
    // Use setTimeout to ensure state is updated before opening file picker
    setTimeout(() => {
      fileInputRef.current.click();
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price || !category || (previews.length === 0)) return;
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('discountedPrice', discountedPrice);
    formData.append('category', category);
    formData.append('popular', popular);
    formData.append('seasonal', seasonal);
    
    // For editing, we need to handle this differently
    if (initialData._id) {
      formData.append('_id', initialData._id);
      
      const keptOriginalImages = [];
      const newImages = [];
      
      // Process each image state to determine what to keep
      imageStates.forEach((imageState) => {
        if (imageState.type === 'original') {
          // This is an original image that wasn't removed - keep it
          keptOriginalImages.push(imageState.url);
        } else if (imageState.type === 'replaced') {
          // This is a replaced image - add the new file
          newImages.push(imageState.file);
        } else if (imageState.type === 'additional') {
          // This is an additional image - add the new file
          newImages.push(imageState.file);
        }
      });
      
      // Add kept original images
      keptOriginalImages.forEach(url => {
        formData.append('existingImages', url);
      });
      
      // Add new/replaced images
      newImages.forEach(file => {
        formData.append('images', file);
      });
      
    } else {
      // For new items, just add all images as files
      replacedImages.forEach(file => {
        formData.append('images', file);
      });
      
      additionalImages.forEach(img => {
        formData.append('images', img);
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