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
      console.log("user added" + user)
      if (users.length >= 2) {
        io.emit("readyForOnline",users)
      }
    })
    socket.on('updatePlayer', (playerinfos) => {
      socket.broadcast.emit('updatePlayer',playerinfos)
    });
    socket.on('disconnect', () => {
      console.log('user disconnected');
      users.splice(users.findIndex((user) => {
        return user.id === socket.id
      }), 1)
      console.log(users)
    });
  });


server.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:3000');
});
