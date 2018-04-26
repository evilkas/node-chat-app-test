const path = require('path');
const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const pathToPublicDir = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(pathToPublicDir));

io.on('connection', (socket) => {
  console.log('New socket');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat!'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined the chat'));

  socket.on('createMessage', (clientMessage, callback) => {
    console.log('createMessage', clientMessage);

    io.emit('newMessage', generateMessage(clientMessage.from, clientMessage.text));
    callback('This is from the server.');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });
});

server.listen(port, () => console.log(`Running on port ${port}`));