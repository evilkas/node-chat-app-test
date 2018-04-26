const path = require('path');
const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const { generateMessage } = require('./utils/message');
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

  // Listen for client messages
  socket.on('createMessage', (clientMessage, callback) => {
    console.log('createMessage', clientMessage);

    io.emit('newMessage', generateMessage(clientMessage.from, clientMessage.text));
    callback('This is from the server.');
    // socket.broadcast.emit('newMessage', {
    //   from: clientMessage.from,
    //   text: clientMessage.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });
});

server.listen(port, () => console.log(`Running on port ${port}`));