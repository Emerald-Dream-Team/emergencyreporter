// Import necessary modules
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// Create an Express application
const app = express();
const server = http.createServer(app);

// Create a Socket.IO instance attached to the server
const io = socketIO(server);

// Serve your static files (e.g., HTML, CSS, client-side JavaScript)
app.use(express.static('public'));

// Store emergency information
let emergencyInfo = {
  emergencyType: '',
  evacuationArea: '',
};

// Set up a connection event for new clients
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle the 'updateEmergency' event from admins
  socket.on('updateEmergency', (data) => {
    // Update the emergency information
    emergencyInfo = {
      emergencyType: data.emergencyType,
      evacuationArea: data.evacuationArea,
    };

    // Broadcast the updated information to all connected clients
    io.emit('emergencyUpdated', emergencyInfo);
  });

  // Handle the 'notifyUsers' event from admins
  socket.on('notifyUsers', () => {
    // Broadcast a notification event to all connected clients
    io.emit('notification', 'Emergency notification: ' + emergencyInfo.emergencyType);
  });

  // Handle disconnection events
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
