const Cloth = require('../models/Cloth');
const cloudinary = require('../config/cloudinary');

// GET all clothes
exports.getClothes = async (req, res) => {
  try {
    const clothes = await Cloth.find().sort({ createdAt: -1 });
    res.json(clothes);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// CREATE new cloth (with image upload)
exports.createCloth = async (req, res) => {
  try {
    const { title, price, discountedPrice, category, popular, seasonal } = req.body;
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No images uploaded' });
    }
    const imageUploadPromises = req.files.map(file =>
      new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }).end(file.buffer);
      })
    );
    const imageUrls = await Promise.all(imageUploadPromises);
    const newCloth = new Cloth({
      title,
      price,
      discountedPrice,
      category,
      images: imageUrls,
      popular: popular === 'true' || popular === true,
      seasonal: seasonal === 'true' || seasonal === true,
    });
    await newCloth.save();
    res.status(201).json(newCloth);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE cloth (with optional image upload)
exports.updateCloth = async (req, res) => {
  try {
    const { title, price, discountedPrice, category, popular, seasonal } = req.body;
    
    // Handle existingImages - it might be in different formats
    let existingImages = req.body.existingImages;
    
    const update = {
      title,
      price,
      discountedPrice,
      category,
      popular: popular === 'true' || popular === true,
      seasonal: seasonal === 'true' || seasonal === true,
    };

    // Handle images: combine existing and new images
    let finalImages = [];
    
    // Add existing images that should be preserved
    if (existingImages) {
      // If existingImages is a string, convert to array
      const existingImagesArray = Array.isArray(existingImages) ? existingImages : [existingImages];
      finalImages = [...existingImagesArray];
    }
    
    // Add new uploaded images
    if (req.files && req.files.length > 0) {
      const imageUploadPromises = req.files.map(file =>
        new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result.secure_url);
            }
          }).end(file.buffer);
        })
      );
      
      try {
        const newImageUrls = await Promise.all(imageUploadPromises);
        finalImages = [...finalImages, ...newImageUrls];
      } catch (uploadError) {
        return res.status(500).json({ error: 'Image upload failed', details: uploadError.message });
      }
    }
    
    // Always update images if we have any final images, or if we explicitly want to preserve existing ones
    if (finalImages.length > 0 || existingImages) {
      update.images = finalImages;
    }
    
    const cloth = await Cloth.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(cloth);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE cloth
exports.deleteCloth = async (req, res) => {
  try {
    await Cloth.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cloth deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}; 