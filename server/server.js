const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const players = [];

app.use(express.static(__dirname + '/../client'));

  io.on('connection', (socket) => {
    if (players.length === 2) {
      return
    }
    socket.on('newPlayer', (player) => {
      players.push(player)
      console.log("Player add"+player)
      if (players.length >= 2) {
        io.emit("readyForOnline",players)
      }
    })
  });

//   io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//       console.log('message: ' + msg);
//     });
//   });

//   io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//       io.emit('chat message', msg);
//     });
//   });

server.listen(3000, () => {
  console.log('listening on *:3000');
});
