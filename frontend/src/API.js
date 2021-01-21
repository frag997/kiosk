import io from 'socket.io-client';

const socket = io('http://localhost:5000', {
    transports: ['websocket']
  });

  socket.on('connect', function() {
      socket.emit('connected', {data: 'I\'m connected!'});
  });

  socket.on('completion', function(msg, cb) {
    if (cb) {
        cb(msg);
    }
  }); 
