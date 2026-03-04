const mongoose = require('mongoose');

const ClothSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  discountedPrice: { type: Number },
  category: { type: String, required: true, index: true },
  images: [{ type: String, required: true }],
  popular: { type: Boolean, default: false, index: true },
  seasonal: { type: Boolean, default: false, index: true },
}, { timestamps: true });

module.exports = mongoose.model('Cloth', ClothSchema); 