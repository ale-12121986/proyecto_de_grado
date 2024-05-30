const express = require('express');
const app = express();
const socketIO = require('socket.io');
const http = require('http');

console.log("entroIoInstance");

const server = http.createServer(app);
const io = socketIO(server);

// Configura eventos de Socket.IO aquí si es necesario
io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');
    
    // Maneja cualquier lógica adicional aquí
  });
module.exports = io;
