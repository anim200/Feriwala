const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500, // Limit the description length
  },
  image: {
    type: String,
    required: true, // Assuming the image is required
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

advertisementSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Advertisement = mongoose.model('Advertisement', advertisementSchema);

module.exports = Advertisement;
