import http from 'http';
import express from 'express';
import { Server as SocketIOServer } from 'socket.io'; // Import the Server from socket.io
import cors from 'cors';

import { addUser, removeUser, getUser, getUsersInRoom } from './user.js'; // Adjust the path as necessary

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*', // Allow all origins
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
});

// Middleware
app.use(cors());

// Store room-specific states
const rooms = {};

io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on('joinRoom', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) {
      return callback(error); // Return error if user cannot be added
    }
   
    
    socket.join(room);
    io.to(room).emit('roomData', user); // Broadcast the user list to all in the room
    callback();
  });

  socket.on('codeUpdate', ({ room, code }) => {
    // console.log(socket.id);
    // console.log(code);
    socket.to(room).emit('codeUpdate', code); // Broadcast the code update to all clients in the room
  });

  socket.on("message", (data) => {
    const { room, message } = data;
    const use = getUser(socket.id);
    socket.to(room).emit("message", { sender: use.name, message });
  });
  

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    console.log(user); // Remove the disconnected user
    if (user) {
      io.to(user.room).emit('roomData', getUsersInRoom(user.room)); // Update room data
    }
  });
});

// Start server
server.listen(process.env.PORT || 8000, () => {
  console.log(`Server has started.`);
});

