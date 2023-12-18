// Import necessary modules
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();
const server = http.createServer(app);

// Create a Socket.IO instance attached to the server
const io = socketIO(server);

// Use bodyParser middleware to parse POST requests
app.use(bodyParser.urlencoded({ extended: true }));

// Serve your static files with authentication middleware for admin
app.post('/admin', (req, res) => {
  const adminPassword = req.body.password;

  if (adminPassword === 'admin') {
    res.json({ success: true }); // Send JSON response on success
  } else {
    res.status(401).json({ success: false }); // Send JSON response on failure
  }
});

app.use(express.static('public'));
app.use('/admin', express.static('admin'));

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
