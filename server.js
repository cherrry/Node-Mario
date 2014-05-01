/*
var rooms = new Array(6);
for (var i = 0; i < 6; i++) {
  rooms[i] = Object();
  rooms[i]['length'] = 0;
  rooms[i]['players'] = [null, null, null, null];
}
*/

// initialize the server
var port = process.env.PORT || 8080,
    server = require('http').createServer();
server.listen(port);
var io = require('socket.io').listen(server);
io.configure('origins', 'http://localhost:*', 'http://cherrry.github.io:*', 'https://cherrry.github.io:*');


// function for generating new id
var random_string = (function() {
  var char_list = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  return function(length) {
    var ret = '';
    for (var i = 0; i < length; i++) {
      ret += char_list.charAt(Math.floor(Math.random() * 60));
    }
    return ret;
  };
})();
var next_color = function(room, old_color) {
  console.log(room.players);
  var color = Array(8);
  for (var i = 0; i < 8; i++) {
    color[i] = 0;
  }
  for (var i = 0; i < 4; i++) {
    if (room.players[i] != null) {
      color[room.players[i].color] = 1;
    }
  }
  for (var i = old_color + 1; i < 8; i++) {
    if (color[i] == 0) return i;
  }
  for (var i = 0; i < old_color; i++) {
    if (color[i] == 0) return i;
  }
  return -1;
};

// player data
var players = Object(),
    rooms = Array(6);

for (var i = 0; i < 6; i++) {
  rooms[i] = { number: i, players: [ null, null, null, null ] };
}


// accepting new connection
io.sockets.on('connection', function (socket) {
  var player = {
    id: random_string(8),
    name: 'Player',
    room: { number: -1, position: -1 }
  };
  players[player.id] = player;

  socket.join('idle');

  // player connect to server
  socket.on('connect request', function (data) {
    console.log('new connection: ' + data.name);
    player.name = data.name;
    socket.emit('connect response', { player: { id: player.id }, rooms: rooms });
  });

  // player change his/her name
  socket.on('name change', function (data) {
    player.name = data.name;

    if (player.room.number != -1) {
      // boardcast name change to idle player and player in same room
      rooms[player.room.number].players[player.room.position].name = player.name;
      io.sockets.in('room_' + player.room.number).emit('room status change', rooms[player.room.number]);
      socket.broadcast.in('idle').emit('room status change', rooms);
    }
  });

  // join a game room
  socket.on('join room request', function (data) {

    var room = rooms[data.room], accept = false;

    if (player.room.number != -1) {
      return;
    }

    for (var i = 0; i < 4; i++) {
      if (room.players[i] == null) {
        // there is empty space
        accept = true;

        // assign player to room
        room.players[i] = { id: player.id, name: player.name, color: next_color(room, -1) };
        player.room = { number: data.room, position: i };
        break;
      }
    }

    if (accept) {
      // accepting player request
      socket.leave('idle');
      socket.join('room_' + player.room.number);
      socket.emit('join room response', { status: 'accept', room: room });

      socket.broadcast.in('room_' + player.room.number).emit('room status change', room);
      socket.broadcast.in('idle').emit('room status change', rooms);
    } else {
      // reject as the game room is full
      socket.emit('join room response', { status: 'reject' });
    }

  });

  // leave room
  socket.on('leave room request', function (data) {
    if (player.room.number != -1) {

      rooms[player.room.number].players[player.room.position] = null;

      socket.broadcast.in('room_' + player.room.number).emit('room status change', rooms[player.room.number]);
      socket.broadcast.in('idle').emit('room status change', rooms);

      socket.leave('room_' + player.room.number);
      socket.join('idle');

      player.room = { number: -1, position: -1 };
      socket.emit('leave room response', { status: 'accept', rooms: rooms });
    }
  });

  // chatting
  socket.on('chat message send', function (data) {
    if (player.room.number == -1) {
      // ignore player message when he/she is not in a room
      return;
    }

    io.sockets.in('room_' + player.room.number).emit('chat message recieved', { name: player.name, message: data.message });
    //console.log('chat message is broadcasted: ' + JSON.stringify(data));
  });

  // change color
  socket.on('change color request', function(data) {
    if (player.room.number == -1) {
      // ignore request from invalid user
      return;
    }
    var room = rooms[player.room.number];
    var color = room.players[player.room.position].color;
    room.players[player.room.position].color = next_color(room, color);
    io.sockets.in('room_' + player.room.number).emit('room status change', room);
    socket.broadcast.in('idle').emit('room status change', rooms);
  });

  // action of disconnecting
  socket.on('disconnect', function () {
    // remove player in any room
    if (player.room.number != -1) {
      rooms[player.room.number].players[player.room.position] = null;
      socket.broadcast.in('room_' + player.room.number).emit('room status change', rooms[player.room.number]);
      socket.broadcast.in('idle').emit('room status change', rooms);
    }
    // remove player from memory
    delete players[player.id];

    for (var room in io.sockets.manager.roomClients[socket.id]) {
      socket.leave(room);
    }

  })
});


/*
var guests = new Object();
io.sockets.on('connection', function(socket) {

  var identity = new Player(socket);
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
*/
