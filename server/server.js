const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const users = [];

app.use(express.static(__dirname + '/../client'));

  io.on('connection', (socket) => {
    if (users.length === 2) {
      return
    }
    socket.on('newUser', (user) => {
      users.push(user)
      console.log("user add"+user)
      if (users.length >= 2) {
        io.emit("readyForOnline",users)
      }
    })
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
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
