const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

// Maintain a set of broadcast messages on the server
let broadcastMessages = new Set();

// Keep track of connected users and their roles
const connectedUsers = {};

io.on('connection', (socket) => {
  console.log('A user connected');

  // Assign a default role of 'guest' to the user
  connectedUsers[socket.id] = { role: 'guest' };

  // Send all broadcast messages to the connecting client
  socket.emit('allMessages', Array.from(broadcastMessages));

  socket.on('message', (data) => {
    const { message, role } = data;

    // Add the message to the set with a unique identifier
    const messageId = `${socket.id}-${Date.now()}`;
    const timestamp = new Date().toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles' });
    const messageWithTimestamp = `${timestamp}: ${message}`;

    broadcastMessages.add({ id: messageId, message: messageWithTimestamp, senderSocketId: socket.id });

    // Broadcast the message to all connected clients
    io.emit('broadcast', { id: messageId, message: messageWithTimestamp, senderSocketId: socket.id });
  });

  socket.on('setRole', (role) => {
    // Set the role for the user
    connectedUsers[socket.id].role = role;

    // Broadcast the updated list of connected users and their roles to all clients
    io.emit('connectedUsers', connectedUsers);
  });

  socket.on('clearMessages', () => {
    // Check if the user has the 'admin' role before clearing messages
    if (connectedUsers[socket.id].role === 'admin') {
      // Clear the set of broadcast messages on the server
      broadcastMessages.clear();

      // Broadcast the message to clear messages to all connected clients
      io.emit('messagesCleared');
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    // Remove the disconnected user from the list of connected users
    delete connectedUsers[socket.id];
    // Broadcast the updated list of connected users and their roles to all clients
    io.emit('connectedUsers', connectedUsers);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
