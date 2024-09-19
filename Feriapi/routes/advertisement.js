const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs'); // To handle file deletion
const Advertisement = require('../model/Advertisment'); // Import the Advertisement model

const router = express.Router();

// Configure multer storage for advertisement images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); // Save images to 'public/uploads/' directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname); // Extract the original file extension
    cb(null, `advertisement-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({ storage: storage });

// Route to handle advertisement image upload and create an advertisement
router.post('/post', upload.single('image'), async (req, res) => {
  console.log("router reached");
  const { description } = req.body;

  if (!req.file) {
    return res.status(400).send('No image uploaded');
  }

  const filePath = `/uploads/${req.file.filename}`; // Path to the uploaded image
  const fileUrl = `http://localhost:5000${filePath}`; // URL to access the image

  try {
    const newAd = new Advertisement({
      description,
      image: fileUrl, // Save the image URL in the advertisement document
    });

    const savedAd = await newAd.save(); // Save the advertisement to the database
    res.status(201).json(savedAd); // Respond with the saved advertisement
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle errors
  }
});

// Route to get all advertisements
router.get('/getall', async (req, res) => {
  try {
    const ads = await Advertisement.find(); // Fetch all advertisements from the database
    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get an advertisement by ID
router.get('/get/:id', async (req, res) => {
  try {
    const ad = await Advertisement.findById(req.params.id);
    if (!ad) {
      return res.status(404).send('Advertisement not found');
    }

    res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to delete an advertisement by ID
router.delete('/delete/:id', async (req, res) => {
    try {
      console.log("Router reached, ID received:", req.params.id);
  
      // Validate the ID format
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Invalid ID format');
      }
  
      // Find and delete the advertisement by ID
      const ad = await Advertisement.findByIdAndDelete(req.params.id);
      if (!ad) {
        return res.status(404).send('Advertisement not found');
      }
  
      res.json({ message: 'Advertisement deleted successfully' });
    } catch (err) {
      console.error("Error deleting advertisement:", err.message);
      res.status(500).json({ message: 'Server error' });
    }
  });
module.exports = router;
