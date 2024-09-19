const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../model/User');

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname); // Extract the original file extension
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('profilePicture'), async (req, res) => {
  const { userId } = req.body;

  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  const filePath = `/uploads/${req.file.filename}`; // Ensure correct path format
  const fileUrl = `http://localhost:5000${filePath}`; // Ensure the URL matches your server

  console.log("File URL:", fileUrl); // Debugging

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).send('User not found');
  }

  user.profilePicture = fileUrl;
  await user.save();

  res.json({ url: fileUrl });
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).send('User not found');
  }

  res.json(user);
});

module.exports = router;
