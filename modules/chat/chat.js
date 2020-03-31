const socketIO = require('socket.io');

module.exports = (server) => {
    let usersList = [];
    const io = socketIO(server);

    io.on('connection', socket => {
        socket.username = 'Anonymous';

        socket.on('username_register', (data) => {
            socket.username = data.username;

            //add user to list
            if (!usersList.includes(socket.username)) {
                usersList.push(socket.username);
            }

            //send user connected event
            io.sockets.emit('user_connected', {users: usersList});

            //set current admin on connected
            if (usersList.length) {
                socket.admin = usersList[0];
            }

            //send event to current admin
            io.sockets.emit(socket.admin, {users: usersList});
        });

        socket.on('new_message', (data) => {
            //broadcast new message
            io.sockets.emit('new_message', {message: data.message, username: socket.username})
        });

        socket.on('typing', () => socket.broadcast.emit('typing', {username: socket.username}));

        socket.on('user_delete', (data) => {
            usersList.splice(usersList.indexOf(data['user']), 1);
            socket.broadcast.emit('user_disconnected', { users: usersList });
            io.sockets.emit('after_delete', { user: data['user'], reason: data['reason'] });
            io.sockets.emit(data['user'] +'_delete', data['user']);
        });

        socket.on('disconnected', (user) => {
            //change admin
            if (usersList.indexOf(user) === 0) {
                usersList.splice(usersList.indexOf(user), 1);
                socket.admin = usersList[0];

                io.sockets.emit(socket.admin, {users: usersList});
            } else {
                usersList.splice(usersList.indexOf(user), 1);
            }

            socket.broadcast.emit('user_disconnected', {users: usersList});
        })
    });
};
