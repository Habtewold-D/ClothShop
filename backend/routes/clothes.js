const express = require('express');
const router = express.Router();
const multer = require('multer');
const jwt = require('jsonwebtoken');
const clothesController = require('../controllers/clothesController');

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
router.get('/', clothesController.getClothes);

// POST new cloth (with image upload)
router.post('/', auth, upload.array('images', 5), clothesController.createCloth);

// PUT edit cloth (with optional image upload)
router.put('/:id', auth, upload.array('images', 5), clothesController.updateCloth);

// DELETE cloth
router.delete('/:id', auth, clothesController.deleteCloth);

module.exports = router; 