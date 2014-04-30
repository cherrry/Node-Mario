
var port = process.env.PORT || 8080;
var server = require('http').createServer();
server.listen(port);
console.log(port);

var io = require('socket.io').listen(server);
io.configure('origins', 'http://localhost:*, http://cherrry.github.io:*, https://cherrry.github.io:*');

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
  var id, name, room;

  socket.on('join', function(data) {
    // when user join room
    id = random_string(8);
    if (data.id != null) {
      id = data.id;
    }
    name = data.name;
    room = 'room_' + data.room;
    socket.join(room);

    socket.emit('join accept', { id: id });
    io.sockets.in(room).emit('new player', { id: id, name: name });    
  });
});

