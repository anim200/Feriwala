const express = require("express");
const http = require('http');
const app = express();
const server = http.createServer(app);
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const socketIo = require('socket.io');
const mongoose = require("mongoose");
const Chat = require('./model/Chat');


const User = require("./model/User");
dotenv.config();

const authRoute = require("./routes/auth");
const uploadRoute = require("./routes/upload");
const productRoute = require("./routes/productroute");

const adroute = require("./routes/advertisement");
const chatRoutes = require("./routes/chatroute");

const {verifyTokenAndAuthorization}= require("./routes/verifyToken")

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.log(err));

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174','http://localhost:5000'],
  methods: ["GET", "POST","PUT","DELETE"],
  allowedHeaders: ["Authorization", "Content-Type"], // Allow Content-Type header
  credentials: true
};

app.use(cors(corsOptions)); // Apply CORS middleware

app.use(express.json());

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/productUpload', express.static(path.join(__dirname, 'public/productUpload')));

app.use("/api/auth",authRoute);
app.use("/api", uploadRoute);
app.use("/api/products",productRoute);
app.use("/api/products/search",productRoute);


app.use("/api/ad", adroute);
app.use('/api/chats', chatRoutes);



const io = socketIo(server, {
  cors: corsOptions // Use the same CORS options for Socket.IO
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinRoom', ({ productId }) => {
    socket.join(productId); // Join a room for each product
    console.log(`User joined room: ${productId}`);
  });

  socket.on('sendMessage', async ({ productId, senderId, content }) => {
    try {
      let chat = await Chat.findOne({ product: productId });
      if (!chat) {
        chat = new Chat({ product: productId, messages: [] });
      }

      const newMessage = { sender: senderId, content };
      chat.messages.push(newMessage);
      await chat.save();

      io.to(productId).emit('message', newMessage); // Emit the new message to the room
    } catch (err) {
      console.error(err);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running");
});
