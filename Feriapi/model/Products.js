const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  categories: { type: String, required: true }, // Category should be a string representing the selected category
  
  // Electronics
  brand: { type: String, default: "" }, // Relevant for Electronics, Sports, Clothings, Cycle, Accessories, Home Living
  model: { type: String, default: "" }, // Relevant for Electronics, Cycle, Home Living
  warranty: { type: String, default: "" }, // Relevant for Electronics
  
  // Sports
  type: { type: String, default: "" }, // Relevant for Sports, Clothings, Cycle
  size: { type: String, default: "" }, // Relevant for Sports, Clothings
  weight: { type: Number, default: 0 }, // Relevant for Sports, Cycle, Home Living
  color: { type: String, default: "" }, // Relevant for Sports, Clothings, Accessories, Cycle, Home Living
  
  // Clothing
  material: { type: String, default: "" }, // Relevant for Clothings, Home Living
  
  // Medicines
  medicine_name: { type: String, default: "" }, // Relevant for Medicines
  dosage: { type: String, default: "" }, // Relevant for Medicines
  expirationDate: { type: Date, default: null }, // Relevant for Medicines
  
  // Accessories
  accessoryType: { type: String, default: "" }, // Relevant for Accessories
  compatibility: { type: String, default: "" }, // Relevant for Accessories
  
  // Cycle
  frameMaterial: { type: String, default: "" }, // Relevant for Cycle
  wheelSize: { type: String, default: "" }, // Relevant for Cycle
  brakeType: { type: String, default: "" }, // Relevant for Cycle
  gearSystem: { type: String, default: "" }, // Relevant for Cycle
  
  // Home Living
  item_name: { type: String, default: "" }, // Relevant for Home Living
  dimensions: { type: String, default: "" }, // Relevant for Home Living
  style: { type: String, default: "" }, // Relevant for Home Living
  roomType: { type: String, default: "" }, // Relevant for Home Living

  // Common Fields
  price: { type: Number, required: true, default: 0 }, // Required for all categories
  description: { type: String, required: true, default: "" }, // Required for all categories
  images: {
    type: [String],
    validate: {
      validator: function (val) {
        return val.length > 0 && val.length <= 5;
      },
      message: 'Images array must have 1 to 5 images'
    }
  },

  // Optional Fields
  authenticity: { type: String, default: "" }, // Optional, relevant for any category
  condition: { type: String, default: "" }, // Optional, relevant for any category
  phoneNumber: { type: String, default: "" }, // Optional, relevant for any category

}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);


