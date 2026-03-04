const Cloth = require('../models/Cloth');
const cloudinary = require('../config/cloudinary');

// GET all clothes
exports.getClothes = async (req, res) => {
  try {
    const { page = 1, limit = 12, category, popular, seasonal } = req.query;
    const query = {};

    if (category) query.category = category;
    if (popular === 'true') query.popular = true;
    if (seasonal === 'true') query.seasonal = true;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const total = await Cloth.countDocuments(query);
    const clothes = await Cloth.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      clothes,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit))
    });
  } catch (err) {
    console.error('getClothes error:', err);
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
        cloudinary.uploader.upload_stream(
          {
            resource_type: 'image',
            folder: 'bernos_boutique',
            quality: 'auto',
            fetch_format: 'auto'
          },
          (error, result) => {
            if (error) reject(error);
            else resolve({ url: result.secure_url, public_id: result.public_id });
          }
        ).end(file.buffer);
      })
    );
    const imagesInfo = await Promise.all(imageUploadPromises);
    const newCloth = new Cloth({
      title,
      price,
      discountedPrice,
      category,
      images: imagesInfo,
      popular: popular === 'true' || popular === true,
      seasonal: seasonal === 'true' || seasonal === true,
    });
    await newCloth.save();
    res.status(201).json(newCloth);
  } catch (err) {
    console.error('Create error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE cloth (with optional image upload)
exports.updateCloth = async (req, res) => {
  try {
    const { title, price, discountedPrice, category, popular, seasonal } = req.body;
    let existingImages = req.body.existingImages;
    if (typeof existingImages === 'string') {
      try {
        existingImages = JSON.parse(existingImages);
      } catch (e) {
        existingImages = [existingImages];
      }
    }

    const currentCloth = await Cloth.findById(req.params.id);
    if (!currentCloth) return res.status(404).json({ error: 'Cloth not found' });

    // Find images to delete from Cloudinary (only for new-style objects with public_id)
    const existingPublicIds = existingImages
      .map(img => (img && typeof img === 'object') ? img.public_id : null)
      .filter(id => id);

    const deletedImages = currentCloth.images.filter(img =>
      (img && typeof img === 'object' && img.public_id) && !existingPublicIds.includes(img.public_id)
    );

    // Delete removed images from Cloudinary
    for (const img of deletedImages) {
      if (img.public_id) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    const update = {
      title,
      price,
      discountedPrice,
      category,
      popular: popular === 'true' || popular === true,
      seasonal: seasonal === 'true' || seasonal === true,
    };

    let finalImages = [...existingImages];

    // Add new uploaded images
    if (req.files && req.files.length > 0) {
      const imageUploadPromises = req.files.map(file =>
        new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              resource_type: 'image',
              folder: 'bernos_boutique',
              quality: 'auto',
              fetch_format: 'auto'
            },
            (error, result) => {
              if (error) reject(error);
              else resolve({ url: result.secure_url, public_id: result.public_id });
            }
          ).end(file.buffer);
        })
      );

      const newImagesInfo = await Promise.all(imageUploadPromises);
      finalImages = [...finalImages, ...newImagesInfo];
    }

    update.images = finalImages;

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
    const cloth = await Cloth.findById(req.params.id);
    if (!cloth) return res.status(404).json({ message: 'Cloth not found' });

    // Delete images from Cloudinary (only if they have a public_id)
    for (const img of cloth.images) {
      if (img && typeof img === 'object' && img.public_id) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    await Cloth.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cloth and associated images deleted' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
