const express = require('express')
const { createServer } = require('node:http')
const { join } = require('node:path')
const { Server } = require('socket.io')

const app = express()
const server = createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'))
})


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('send message', (msg) => {
    console.log('message: ' + msg.msg);
    io.emit('send message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log(`Server is running at 3000`)
})
