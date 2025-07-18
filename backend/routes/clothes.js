const express = require('express');
const router = express.Router();
const Cloth = require('../models/Cloth');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Auth middleware
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token' });
  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// GET all clothes
router.get('/', async (req, res) => {
  try {
    const clothes = await Cloth.find().sort({ createdAt: -1 });
    res.json(clothes);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new cloth (with image upload)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, price, discountedPrice, category, popular } = req.body;
    cloudinary.uploader.upload_stream({ resource_type: 'image' }, async (error, result) => {
      if (error) return res.status(500).json({ error: 'Cloudinary upload failed' });
      const newCloth = new Cloth({
        title,
        price,
        discountedPrice,
        category,
        imageUrl: result.secure_url,
        popular: popular === 'true' || popular === true,
      });
      await newCloth.save();
      res.status(201).json(newCloth);
    }).end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT edit cloth (with optional image upload)
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, price, discountedPrice, category, popular } = req.body;
    const update = {
      title,
      price,
      discountedPrice,
      category,
      popular: popular === 'true' || popular === true,
    };
    if (req.file) {
      // Upload new image
      cloudinary.uploader.upload_stream({ resource_type: 'image' }, async (error, result) => {
        if (error) return res.status(500).json({ error: 'Cloudinary upload failed' });
        update.imageUrl = result.secure_url;
        const cloth = await Cloth.findByIdAndUpdate(req.params.id, update, { new: true });
        res.json(cloth);
      }).end(req.file.buffer);
    } else {
      const cloth = await Cloth.findByIdAndUpdate(req.params.id, update, { new: true });
      res.json(cloth);
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE cloth
router.delete('/:id', auth, async (req, res) => {
  try {
    await Cloth.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cloth deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 