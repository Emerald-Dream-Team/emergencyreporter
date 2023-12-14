const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

// Maintain a list of broadcast messages on the server
const broadcastMessages = [];

io.on('connection', (socket) => {
  console.log('A user connected');

  // Send all broadcast messages to the connecting client
  socket.emit('allMessages', broadcastMessages);

  socket.on('message', (data) => {
    // Add the message to the list with a timestamp
    const timestamp = new Date().toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles' });
    const messageWithTimestamp = `${timestamp}: ${data}`;
    
    // Check if the message already exists to avoid duplicates
    if (!broadcastMessages.includes(messageWithTimestamp)) {
      broadcastMessages.push(messageWithTimestamp);

      // Broadcast the message to all connected clients
      io.emit('broadcast', { message: messageWithTimestamp, senderSocketId: socket.id });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
