import React, { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './chat.css'; // Import the CSS file
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from "../../Components/Navbar";
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:5000'); // Connect to the Socket.IO server

const Chat = () => {
  const { productId } = useParams();
  const location = useLocation();
  const product = location.state?.product; // Get the product details passed via route
  const user = useSelector((state) => state.user.currentUser); // Current logged-in user
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Join the chat room for the specific product
    socket.emit('joinRoom', { productId });

    // Fetch chat messages for the product
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/chats/${productId}`);
        setMessages(response.data[0]?.messages || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();

    // Clean up when component unmounts or productId changes
    return () => {
      socket.emit('leaveRoom', { productId }); // Leave the chat room
    };
  }, [productId]);

  useEffect(() => {
    // Listen for incoming messages
    const messageListener = (message) => {
      console.log('Incoming message:', message); // Log the message for debugging
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on('message', messageListener);

    // Clean up the listener on unmount
    return () => {
      socket.off('message', messageListener);
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        productId,
        senderId: user._id,
        content: newMessage,
      };

      // Emit the message to the server only (don't add it locally right away)
      socket.emit('sendMessage', messageData);

      // Clear the input field after sending the message
      setNewMessage('');
    }
  };
  console.log("messege sender id",messages.sender)
  console.log("username",user.username)

  // Memoize the function to avoid unnecessary recalculations on each render
  const renderMessageSenderLabel = useCallback(

    (msgSenderId) => {
      console.log(msgSenderId)
      if (!msgSenderId) return 'Unknown'; // Handle undefined sender ID gracefully
  
      if (msgSenderId === user._id) {
        return 'You';
      } else if (msgSenderId === product?.user._id) {
        return `${product.user.username}`;
      } else {
        return 'buyer';
      }
    },
    [user._id, product?.user._id]
  );
  const navigate = useNavigate()
  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.msg); // Optional: Handle success message
          
          // Navigate to home page after successful deletion
          navigate('/');
        } else {
          const errorData = await response.json();
          console.error(errorData.msg); // Log the error message
          alert(errorData.msg); // Optionally, display an error message to the user
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('An error occurred while deleting the product. Please try again.');
      }
    }
  };
  
  return (
    <>
      <Navbar/>
     
   
    <div className="chat-container">
    <div className="postUserSection">
  {user._id === product.user._id ? (
    <div className="postDeleteButton">
      <button className="deleteButton"  onClick={() => handleDelete(product._id)}>Delete the prouct if sold</button>
    </div>
  ) : (
    <span className="postUserName">{user.username}</span>
  )}
</div>

    
      <div className="chat-messages">
        {messages && messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${
                msg.sender === user._id
                  ? 'user-message' // Current user is the sender
                  : 'owner-message' // Message is from the product owner or other users
              }`}
            >
              <p className="chat-content">
                <strong>{renderMessageSenderLabel(msg.sender)}:</strong>{' '}
                {msg.content}
              </p>
            </div>
          ))
        ) : (
          <p>No messages to show</p>
        )}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="chat-input"
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage} className="chat-send-button">
          Send
        </button>
      </div>
    </div>
    </>
   
  );
};

export default Chat;


