const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
let users = [];
let waitingUsers = [];

app.use(express.static(__dirname + '/../client'));

  io.on('connection', (socket) => {
    // if (users.length === 2) {
    //   return
    // }
    socket.on('newUser', (user) => {
      if (users.length === 2) {
        waitingUsers.push(user)
      } else {
        users.push(user)
        if (users.length === 2) {
          io.emit("readyForOnline",users)
        }
      }
    })
    socket.on('updatePlayer', (playerinfos) => {
      socket.broadcast.emit('updatePlayer',playerinfos)
    });
    socket.on('leaveOnline', () => {
      users.splice(users.findIndex(user => user.id === socket.id), 1)
    });
    socket.on('endOfFight', () => {
        users = [];
        io.emit('returnOtherPlayerToMenu')
        const reloadUsers = waitingUsers
        reloadUsers.forEach(user => {
        if (users.length < 2) {
            users.push(user)
          }
        })
        waitingUsers.splice(0, 2);
        if (users.length === 2) {
          io.emit("readyForOnline",users)
        }
    })
    socket.on('disconnect', () => {
        users = [];
        io.emit('returnOtherPlayerToMenu')
        const reloadUsers = waitingUsers
        reloadUsers.forEach(user => {
        if (users.length < 2) {
            users.push(user)
          }
        })
        waitingUsers.splice(0, 2);
        if (users.length === 2) {
          io.emit("readyForOnline",users)
        }
    });
  });


server.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:3000');
});
