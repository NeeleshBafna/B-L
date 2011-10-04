var io = require('socket.io'),
    express = require('express'),
    app = express.createServer(),
    http = require('http'),
    url = require('url'),
    fs = require('fs'),
    s3 = require('./BackUpLogic');

app.configure(function (request, response) {
	app.use(express.cookieParser());
	app.use(express.static(__dirname + '/../www'));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.listen(80);
var sio = io.listen(app);

//Listening B+L
sio.sockets.on('connection', function (socket) {
    console.log('Connection Created');
    socket.emit('info', { message: 'Well You Are connected to the system now!!' });

    socket.on('info',function(data){
	console.log('Info Received from Client' + JSON.stringify(data));
    });

    s3.backUp(socket);
});