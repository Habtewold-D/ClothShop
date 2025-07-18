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
};

// UPDATE cloth (with optional image upload)
exports.updateCloth = async (req, res) => {
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