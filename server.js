var rooms = new Array(6);
for (var i = 0; i < 6; i++) {
  rooms[i] = Object();
  rooms[i]['length'] = 0;
  rooms[i]['players'] = [null, null, null, null];
}
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
  var id, name, room, pos, color, roomno;

  socket.on('fetch players', function(data) {
    console.log('fetch players');
    socket.emit('return players', rooms[data.room]['players']);
  });

  socket.on('join', function(data) {
    // when user join room
    console.log('join');
    id = random_string(8);
    if (data.id != null) {
      id = data.id;
    }
    name = data.name;
    room = 'room_' + data.room;
    roomno = data.room;
    socket.join(room);
    for (var i in rooms[data.room]['players']) {
      if(!rooms[data.room]['players'][i]) {
        rooms[data.room]['players'][i] = {id:id, name:name, color:i, avgdelay:0};
        pos = i;
        color = i
        break;
      }
    }

    socket.emit('join accept', { id: id, pos: i});
    io.sockets.in(room).emit('new player', { id: id, name: name, color: color, pos: i });
  });

  socket.on('send message', function(data){
    console.log('send message');
    io.sockets.in(room).emit('new message', {name: name, message: data.message});
  });

  socket.on('disconnect', function() {
    console.log('disconnect');
    if (rooms && id){
      io.sockets.emit('player left', {id: id});
      rooms[roomno]['players'][pos] = null;
    }
  });
});

