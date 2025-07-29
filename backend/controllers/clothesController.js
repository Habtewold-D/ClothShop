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
    const update = {
      title,
      price,
      discountedPrice,
      category,
      popular: popular === 'true' || popular === true,
      seasonal: seasonal === 'true' || seasonal === true,
    };
    if (req.files && req.files.length > 0) {
      const imageUploadPromises = req.files.map(file =>
        new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }).end(file.buffer);
        })
      );
      const imageUrls = await Promise.all(imageUploadPromises);
      update.images = imageUrls;
    }
    const cloth = await Cloth.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(cloth);
  } catch (err) {
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