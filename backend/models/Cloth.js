const mongoose = require('mongoose');

const ClothSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  discountedPrice: { type: Number },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  popular: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Cloth', ClothSchema); 