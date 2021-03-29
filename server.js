const express = require('express');
const app = express();
const http = require('http').Server(app);
const fs = require('fs');
const path = require('path');

const ServerEvent = require(path.join(__dirname, 'Controller', 'ServerEvent.js'));

const socketPath = path.join(__dirname, 'Controller', 'socket.js');
require(socketPath).listen(http, ServerEvent);

app.use(express.static(path.join(__dirname, 'public')));


// console.log('ServerEvent', ServerEvent);
const chatFile = fs.readFileSync('./index.html');

function chatCtrl(req, res) {
    res.end(chatFile);
}

app.get('/', (req, res) => res.end('Hello World'));
app.get('/chat', chatCtrl);

app.listen(3000, () => console.log('Server READY'));