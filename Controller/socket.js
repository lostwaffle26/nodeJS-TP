const path = require('path');

const socketio = require('socket.io');

//const ServerEvent = require(path.join(__dirname, 'ServerEvent.js'));
//ServerEvent.emit('Canal 1', 'Oui oui oui oui');

module.exports.listen = (http, ServerEvent) => {
    const io = socketio(http, {
        cors: {
            origin: "http://localhost/3000"
        },
    });

    io.on('connection', socket => {
        socket.on('message', data => console.log(data));
    });
};