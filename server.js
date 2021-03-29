const express = require('express');
const app = express();
const http = require('http').Server(app);
const url = 'mongodb://localhost:27017';
const dbName = 'DBChat';
const MongoClient = require('mongodb').MongoClient;

// Partie socket.io et MongoDB
MongoClient.connect(url, function(err, instance) {
    if (err) {
        process.exit(1);
    } else {
        console.log("Connecté à MongoDB");

        app.get('/', (req, res) => res.redirect('/chat'));

        const db = instance.db('DBChat');
        const collection = db.collection('ChatsMessages');
        collection.insertOne({
            Pseudo: 'Steve',
            message: 'HellO wORLD'
        });
        

        collection.find({}, (err, rawResults) => {
            rawResults.forEach(results => console.log(results));
        });

        http.listen(3000, () => console.log('Server READY'));
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