const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017'
const dbName = 'MaDBChat';

MongoClient.connect(url, function(err, client) {

    if(err){
        process.exit(1);
    }
    
    else{
        console.log("Connecté à MongoDB");
        const db = client.db(dbName);
        const collection = db.collection('ChatsMessages');
        let nb_user = 0;
        app.use("/", express.static(__dirname + "/public"));

        io.on('connection', function (socket) {
            let connected;

            console.log('a user connected');
            socket.on('user-login', function (user) {
                connected = user;
                nb_user = nb_user + 1;
                socket.broadcast.emit('nb_users', nb_user);
                if (connected !== undefined) {
                    let serviceMessage = {
                        text: 'User "' + connected.username + '" logged in',
                        type: 'login'
                    };

                    socket.broadcast.emit('service-message', serviceMessage);
                    socket.broadcast.emit('nb_users', nb_user);
                }
            });

            socket.on('chat-message', function (message) {
                message.username = connected.username;
                io.emit('chat-message', message);
                console.log('Message de ' + connected.username + ': ' + message.text);
                collection.insertOne({Pseudo : connected.username, message : message.text}); 
                socket.broadcast.emit('nb_users', nb_user);
            });
        });


        //Lancement du server sur le port 3000
        http.listen(3000, function () {
            console.log('Server is listening on *:3000');
        });
    }
});


/// Partie Express

// const fs = require('fs');
// const path = require('path');

// const ServerEvent = require(path.join(__dirname, 'Controller', 'ServerEvent.js'));

// const socketPath = path.join(__dirname, 'Controller', 'socket.js');
// require(socketPath).listen(http, ServerEvent);

// app.use(express.static(path.join(__dirname, 'public')));


// // console.log('ServerEvent', ServerEvent);
// const chatFile = fs.readFileSync('./index.html');

// function chatCtrl(req, res) {
//     res.end(chatFile);
// }

// app.get('/', (req, res) => res.end('Hello World'));
// app.get('/chat', chatCtrl);

// app.listen(3000, () => console.log('Server READY'));