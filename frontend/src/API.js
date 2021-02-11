import io from 'socket.io-client';

export const socket = io('http://localhost:5000', {
  transports: ['websocket']
});

socket.on('connect', function () {
  socket.emit('connected', {
    data: 'I\'m connected!'
  });
});


socket.on('completion', async function (msg, cb) {
  const newPrompt = prompt + ' ' + msg.data
  if (cb) {
    cb(newPrompt);
  }
});