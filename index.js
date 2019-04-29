var express = require('express');
var socket = require('socket.io');

//App Setup
var app = express();
var server = app.listen(7000, function(){
	console.log("node connected");
});

// static files
app.use(express.static('public'));

// Socket setup
var io = socket(server);

io.on('connection', function(socket){
	console.log("socket connection id: ", socket.id);

	socket.on('chat', function(data){
		io.sockets.emit('chat', data);
	});
});

