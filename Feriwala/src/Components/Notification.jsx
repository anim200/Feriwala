import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Ensure this matches your backend URL

const BellIcon = styled.div`
  position: relative;
  cursor: pointer;
  font-size: 24px;
  color: ${({ hasNotifications }) => (hasNotifications ? 'red' : 'black')};
`;

const NotificationCount = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  background: red;
  color: white;
  border-radius: 50%;
  padding: 5px;
  font-size: 12px;
`;

const NotificationBell = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/notifications/${user._id}`);
        setNotifications(response.data);
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
      }
    };

    if (user) {
      fetchNotifications();

      socket.on('notification', (notification) => {
        if (notification.receiver === user._id) {
          setNotifications((prev) => [...prev, notification]);
        }
      });
    }

    return () => {
      socket.off('notification');
    };
  }, [user]);

  const handleBellClick = () => {
    if (notifications.length > 0) {
      const { sender,productId } = notifications[0];
      // Navigate programmatically
      window.location.href = `/chat/${sender._id}/${productId._id}`;
    }
  };

  return (
    <BellIcon onClick={handleBellClick} hasNotifications={notifications.length > 0}>
      🔔
      {notifications.length > 0 && (
        <NotificationCount>{notifications.length}</NotificationCount>
      )}
    </BellIcon>
  );
};

export default NotificationBell;




