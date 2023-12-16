const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

// Maintain a set of broadcast messages and guest reports on the server
let messages = [];

// Keep track of connected users and their roles
const connectedUsers = {};

io.on('connection', (socket) => {
  console.log('A user connected');

  // Assign a default role of 'guest' to the user
  connectedUsers[socket.id] = { role: 'guest' };

  // Send all messages to the connecting client
  socket.emit('allMessages', messages);

  socket.on('message', (data) => {
    const { message, role } = data;

    // Add the message to the array with a unique identifier
    const messageId = `${socket.id}-${Date.now()}`;
    const timestamp = new Date().toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles' });
    const messageWithTimestamp = `${timestamp}: ${message}`;

    messages.push({ id: messageId, message: messageWithTimestamp, senderSocketId: socket.id });

    // Broadcast the message to all connected clients
    io.emit('broadcast', { id: messageId, message: messageWithTimestamp, senderSocketId: socket.id });
  });

  // Handle guest reports
  socket.on('report', (data) => {
    const { message, role } = data;

    // Add the report message to the array with a unique identifier
    const reportId = `${socket.id}-report-${Date.now()}`;
    const timestamp = new Date().toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles' });
    const reportWithTimestamp = `${timestamp} (Report from ${role}): ${message}`;

    messages.push({ id: reportId, message: reportWithTimestamp, senderSocketId: socket.id });

    // Broadcast the report to all admins
    io.emit('reportBroadcast', { message: reportWithTimestamp, id: reportId });
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
      // Clear the array of messages on the server
      messages = [];

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
