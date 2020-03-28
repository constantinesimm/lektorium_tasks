module.exports = (app) => {
  const server = app.listen(3003);
  const io = require('socket.io')(server);

  io.on('connection', socket => {
      socket.username = 'Anonymous';
      console.log('New user connected');
      socket.on('username_register', (data) => {
          socket.username = data.username;
      });

      socket.on('new_message', (data) => {
          //broadcast new message
          io.sockets.emit('new_message', { message: data.message, username: socket.username })
      });

      socket.on('typing', (data) => {
          socket.broadcast.emit('typing', { username: socket.username });
      })
  });
};