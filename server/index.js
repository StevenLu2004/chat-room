const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');

const app = express();
const httpsvr = http.createServer(app);
const io = socketio(httpsvr);

app.use(express.static('client'));

app.get('/socket.io', (req, res) => {
    res.sendFile(path.join(__dirname, '../node_modules/socket.io-client/dist/socket.io.js'));
});

io.on('connection', (socket) => {
    console.log('A user is connected.');
    socket.on('message', (msg) => {
        console.log(`Message: ${msg}`);
        io.emit('message', msg);
    });
    socket.on('disconnect', () => {
        console.log('A user is disconnected.');
        io.emit('message', JSON.stringify({
            type: 'announcement',
            content: 'A user left the chat room.'
        }));
    });
    io.emit('message', JSON.stringify({
        type: 'announcement',
        content: 'A user joined the chat room.'
    }));
});

httpsvr.listen(3000, () => {
    console.log('Listening on http://localhost:3000');
});
