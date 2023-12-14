import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Update with your server URL

const MessageBoard = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('emergency-message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('emergency-message');
    };
  }, []);

  return (
    <div>
      <h3>Emergency Messages</h3>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default MessageBoard;
