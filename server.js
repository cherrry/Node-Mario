/*
var port = process.env.PORT || 8080;
var server = require('http').createServer();
server.listen(port);
console.log(port);

var io = require('socket.io').listen(server);
io.configure('origins', 'localhost, cherrry.github.io');

var char_list = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
function random_string(length) {
  ret = '';
  for (i = 0; i < length; i++) {
    ret += char_list.charAt(Math.floor(Math.random() * 60));
  }
  return ret;
}

var guests = new Object();
io.sockets.on('connection', function(socket) {
  socket.emit('message', { message: 'Hello' });
});
*/
var port = process.env.PORT || 8080;
var io = require('socket.io').listen(port);
io.configure('origins', 'localhost:8000, cherrry.github.io');

io.sockets.on('connection', function (socket) {
  socket.emit('message', { hello: 'world' });
});
