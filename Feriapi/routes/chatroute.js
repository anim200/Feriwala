// routes/chat.js
const express = require('express');
const Chat = require('../model/Chat');

const router = express.Router();

// Get chats for a specific product
router.get('/:productId', async (req, res) => {
    try {
      console.log("Router reached");
      console.log(req.params.productId);
  
      const chats = await Chat.find({ product: req.params.productId })
                              .populate('messages.sender', 'username _id'); // Assuming you want username and _id populated
  
      console.log(JSON.stringify(chats, null, 2)); // Pretty-print JSON structure
  
      res.json(chats);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  });

// Send a new message
router.post('/:productId', async (req, res) => {
  const { senderId, content } = req.body;
  try {
    let chat = await Chat.findOne({ product: req.params.productId });

    if (!chat) {
      chat = new Chat({ product: req.params.productId, messages: [] });
    }

    chat.messages.push({ sender: senderId, content });
    await chat.save();

    res.status(201).json(chat);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
