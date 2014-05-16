// initialize the server
var port = process.env.PORT || 21474,
    server = require('http').createServer();
server.listen(port);
var io = require('socket.io').listen(server, { log: false });
io.configure('origins', 'http://localhost:*', 'http://cherrry.github.io:*', 'https://cherrry.github.io:*');

// read world data
var WorldData = require('./world');
console.log(WorldData);

// useful functions
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
  //console.log(room.players);
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
    rooms = Array(6),
    gamedata = Array(6);

for (var i = 0; i < 6; i++) {
  rooms[i] = { number: i, players: [ null, null, null, null ], state: 'wait', settings: { world: 1, life: 3 } };
  gamedata[i] = { world: 'W1', stage: 0, collected: {}, can_collect: false };
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
    //console.log('new connection: ' + data.name);
    player.name = data.name;
    socket.emit('connect response', { player: { id: player.id }, rooms: rooms });
  });

  // measure network latency
  socket.on('ping', function () {
    socket.emit('pong');
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

    var room = rooms[data.room], accept = false, isOwner = true;

    if (player.room.number != -1) {
      return;
    }

    if (room.state == 'play') {
      socket.emit('join room response', { status: 'reject' });
      return;
    }

    for (var i = 0; i < 4; i++) {
      if (room.players[i] != null && room.players[i].isOwner) {
        isOwner = false;
      }
    }

    for (var i = 0; i < 4; i++) {
      if (room.players[i] == null) {
        // there is empty space
        accept = true;

        // assign player to room
        room.players[i] = { id: player.id, name: player.name, color: next_color(room, -1), ready: false, isOwner: isOwner };
        player.room = { number: data.room, position: i };
        break;
      }
    }

    if (accept) {
      // accepting player request

      // check if room become full
      room.state = 'full';
      for (var i = 0; i < 4; i++) {
        if (room.players[i] == null) {
          room.state = 'wait';
        }
      }

      socket.leave('idle');
      socket.join('room_' + player.room.number);
      socket.emit('join room response', { status: 'accept', room: room });

      socket.broadcast.in('room_' + player.room.number).emit('room status change', room);
      socket.broadcast.in('idle').emit('room status change', rooms);
    } else {
      // reject as the game room is full
      socket.emit('join room response', { status: 'reject' });
    }

    //console.log(room);
  });

  // leave room
  socket.on('leave room request', function (data) {
    if (player.room.number == -1) {
      return;
    }

    var room = rooms[player.room.number];

    room.state = 'wait';

    // choose next owner
    if (room.players[player.room.position].isOwner) {
      var candidate = Array(), candidate_count = 0, nextOwner;
      for (var i = 0; i < 4; i++) {
        if (room.players[i] != null && i != player.room.position) {
          candidate[candidate_count++] = room.players[i];
        }
      }
      if (candidate_count > 0) {
        nextOwner = candidate[Math.floor(Math.random() * candidate_count)];
        nextOwner.isOwner = true;
      }
    }
    room.players[player.room.position] = null;

    //console.log('after someone leave: ' + JSON.stringify(room));

    socket.broadcast.in('room_' + player.room.number).emit('room status change', rooms[player.room.number]);
    socket.broadcast.in('idle').emit('room status change', rooms);

    socket.leave('room_' + player.room.number);
    socket.join('idle');

    player.room = { number: -1, position: -1 };
    socket.emit('leave room response', { status: 'accept', rooms: rooms });
  });

  // chatting
  socket.on('chat message send', function (data) {
    if (player.room.number == -1) {
      // ignore player message when he/she is not in a room
      return;
    }
    var room = rooms[player.room.number];

    io.sockets.in('room_' + player.room.number).emit('chat message recieved', { name: player.name, color: room.players[player.room.position].color, message: data.message });
    //console.log('chat message is broadcasted: ' + JSON.stringify(data));
  });

  // change color
  socket.on('change color request', function (data) {
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

  // change setting
  socket.on('change settings', function (data) {
    if (player.room.number == -1) {
      return;
    }

    var room = rooms[player.room.number];
    var roomdata = gamedata[player.room.number];
    if (data.world) {
      console.log('change world to', 'W' + data.world);
      room.settings.world = data.world;
      console.log(roomdata);
      roomdata.world = 'W' + data.world;
      console.log(roomdata);
    }
    if (data.life) {
      room.settings.life = data.life;
    }
    
    socket.broadcast.in('room_' + player.room.number).emit('room settings changed', room.settings);
  });

  // ready state change
  socket.on('ready state change', function (data) {
    if (player.room.number == -1) {
      return;
    }

    var room = rooms[player.room.number];
    room.players[player.room.position].ready = data.ready;
    io.sockets.in('room_' + player.room.number).emit('room status change', room);
  });

  // action of disconnecting
  socket.on('disconnect', function () {
    // remove player in any room
    if (player.room.number != -1) {
      var room = rooms[player.room.number];

      if (room.state != 'play') {
        room.state = 'wait';
      }

      // choose next owner
      if (room.players[player.room.position].isOwner) {
        var candidate = Array(), candidate_count = 0, nextOwner;
        for (var i = 0; i < 4; i++) {
          if (room.players[i] != null && i != player.room.position) {
            candidate[candidate_count++] = room.players[i];
          }
        }
        if (candidate_count > 0) {
          nextOwner = candidate[Math.floor(Math.random() * candidate_count)];
          nextOwner.isOwner = true;
        } else {
          room.state = 'wait';
        }
      }
      room.players[player.room.position] = null;

      // broadcast about room status change
      socket.broadcast.in('room_' + player.room.number).emit('room status change', rooms[player.room.number]);
      socket.broadcast.in('idle').emit('room status change', rooms);
    }
    // remove player from memory
    delete players[player.id];

    for (var room in io.sockets.manager.roomClients[socket.id]) {
      socket.leave(room);
    }
  });

  // start game
  socket.on('start game request', function (data) {
    if (player.room.number == -1) {
      return;
    }
    var room = rooms[player.room.number];
    var readyCount = 0, totalPlayer = 0;
    if (!room.players[player.room.position].isOwner) {
      return;
    }

    for (var i = 0; i < 4; i++) {
      if (rooms[player.room.number].players[i]){
        totalPlayer++;
        if(rooms[player.room.number].players[i].ready)
          readyCount++;
      }
    }

    if (readyCount == totalPlayer && totalPlayer > 0) {
      room.state = 'play';
      io.sockets.in('room_' + player.room.number).emit('start game response', { status: 'accept' });
      socket.broadcast.in('idle').emit('room status change', rooms);
      gamedata[player.room.number] = { world: gamedata[player.room.number].world, stage: 0, collected: {}, can_collect: false, stage_ready_list: [], player_game_over_list: [] };
      // initialize player state, e.g. coins and hp
      for(var i = 0; i < 4; i++){
        var p = rooms[player.room.number].players[i];
        if(p){
          console.log(p);
          p.coins = 0;
          // change the default lives here
          p.lives = room.settings.life;
	  p.state2 = 'small';
        }
      }

      var roomdata = gamedata[player.room.number];
      console.log('start game at world ' + roomdata.world);
      io.sockets.in('room_' + player.room.number).emit('game init', { world: WorldData[roomdata.world][0], players: room.players });
    } else {
      socket.emit('start game response', { status: 'reject' });
    }
  });

  socket.on('player data update', function (data) {
    if (player.room.number == -1) {
      return;
    }
    var room = rooms[player.room.number];
    if (room.state != 'play') {
      return;
    }
    var players = room.players;
    for (var i = 0; i < 4; i++) {
	if(room.players[i] && room.players[i].id == data.id) {
	    room.players[i].lives = data.lives;
	    room.players[i].state2 = data.state2;
	    room.players[i].coins = data.coins;
	}
    }
    socket.broadcast.in('room_' + player.room.number).emit('player data update', data);
  });

  socket.on('collectible data update', function (data) {
    if (player.room.number == -1) {
      return;
    }
    var room = rooms[player.room.number];
    if (room.state != 'play') {
      return;
    }

    // console.log(data);

    socket.broadcast.in('room_' + player.room.number).emit('collectible data update', data);
  });

  socket.on('player collect object', function (data) {
    if (player.room.number == -1) {
      return;
    }
    var room = rooms[player.room.number];
    var roomdata = gamedata[player.room.number];
    if (room.state != 'play' || !roomdata.can_collect) {
      return;
    }

    if (!(data.id in roomdata.collected)) {
      roomdata.collected[data.id] = Array();
    }
    roomdata.collected[data.id].push(player.id);

    //Special handling for flag, other client will show flag falling
    if (data.Type == 'Flag') {
      console.log('Flag collected');
      roomdata.can_collect = false;
      io.sockets.in('room_' + player.room.number).emit('player collect flag', { player: player.id, collectible: data.id, collect_index: roomdata.collected[data.id].length - 1 });
    }

    /*var players = room.players;
    for (int i = 0; i < 4; i++){
      if(players[i] && players[i].id == player.id){
	      players[i].coins++;
	      break;
	    }
    }*/
    io.sockets.in('room_' + player.room.number).emit('player collect object', { player: player.id, collectible: data.id, collect_index: roomdata.collected[data.id].length - 1 });
  });

  socket.on('player flag', function (data) {
    if (player.room.number == -1) {
      return;
    }
    var room = rooms[player.room.number];
    var roomdata = gamedata[player.room.number];
    if (room.state != 'play') {
      return;
    }

    io.sockets.in('room_' + player.room.number).emit('player flag', { player: player.id, position: data });
  });

  socket.on('player yeah', function (data) {
    if (player.room.number == -1) {
      return;
    }
    var room = rooms[player.room.number];
    var roomdata = gamedata[player.room.number];
    if (room.state != 'play') {
      return;
    }

    io.sockets.in('room_' + player.room.number).emit('player yeah', { player: data.player });
  });

  socket.on('player die', function (data) {
    if (player.room.number == -1) {
      return;
    }
    var room = rooms[player.room.number];
    var roomdata = gamedata[player.room.number];
    if (room.state != 'play') {
      return;
    }

    io.sockets.in('room_' + player.room.number).emit('player die', { player: player.id });
  });

  socket.on('player shrink', function (data) {
    if (player.room.number == -1) {
      return;
    }
    var room = rooms[player.room.number];
    var roomdata = gamedata[player.room.number];
    if (room.state != 'play') {
      return;
    }

    io.sockets.in('room_' + player.room.number).emit('player shrink', { player: player.id });
  });

  socket.on('player game over', function (data) {
    if (player.room.number == -1) {
      return;
    }
    var room = rooms[player.room.number];
    if (room.state != 'play') {
      io.sockets.in('room_' + player.room.number).emit('all game over');
      return;
    }
    var roomdata = gamedata[player.room.number];

    var id = data.player;
    roomdata.player_game_over_list[id] = true;
    console.log(id + ' is game over');

    // Count number of non-null players
    var player_count = (function () {
      var ret = 0;
      for (var i = 0; i < room.players.length; i += 1){
        if (room.players[i] != null) {
          ret += 1;
        }
//        if(room.players[i] && room.players[i].id == data.player) {
//            room.players[i].lives = 0;
//        }
      }
      return ret;
    }) ();

    // Count number of game over players
    var game_over_count = (function () {
      var ret = 0;
      for (var i in roomdata.player_game_over_list) {
        if (roomdata.player_game_over_list[i] == true) {
          ret += 1;
        }
      }
      return ret;
    }) ();

    if (game_over_count >= player_count) {
      console.log('All players game over!');
      room.state = 'full';
      for (var i = 0; i < 4; i++) {
        if (room.players[i] == null) {
          room.state = 'wait';
        } else {
          room.players[i].ready = false;
        }
      }
      io.sockets.in('room_' + player.room.number).emit('go back to game room', room);
      io.sockets.in('room_' + player.room.number).emit('room status change', room);
      socket.broadcast.in('idle').emit('room status change', rooms);
    }
  });

  socket.on('stage ready', function (data) {
    if (player.room.number == -1) {
      return;
    }
    var room = rooms[player.room.number];
    if (room.state != 'play') {
      return;
    }
    var roomdata = gamedata[player.room.number];

    var id = data.player;
    roomdata.stage_ready_list[id] = true;
    console.log(id + ' is ready');

    // Count number of non-null players
    var player_count = (function () {
      var ret = 0;
      for (var i = 0; i < room.players.length; i += 1){
        if (room.players[i] != null) {
          ret += 1;
        }
      }
      return ret;
    }) ();

    // Count number of ready players
    var ready_player_count = (function () {
      var ret = 0;
      for (var i in roomdata.stage_ready_list) {
        if (roomdata.stage_ready_list[i] == true) {
          ret += 1;
        }
      }
      return ret;
    }) ();

    if (ready_player_count >= player_count) {
      console.log('All player stage ready');
      roomdata.can_collect = true;
    }
  });

  socket.on('end game', function (data) {
    if (player.room.number == -1) {
      return;
    }
    var room = rooms[player.room.number];
    if (room.state != 'play') {
      return;
    }

    var roomdata = gamedata[player.room.number];
    roomdata.stage = roomdata.stage + 1;

    console.log('change stage', roomdata, WorldData[roomdata.world].length);

    if (roomdata.stage < WorldData[roomdata.world].length) {
      roomdata.collected = {};
      roomdata.can_collect = false;
      for (var i = 0; i < 4; i++){
          if(room.players[i])
               room.players[i].lives++;
      }
      roomdata.stage_ready_list = [];
      roomdata.player_game_over_list = [];
      io.sockets.in('room_' + player.room.number).emit('game init', { world: WorldData[roomdata.world][roomdata.stage], players: room.players });

    } else {
      room.state = 'full';
      for (var i = 0; i < 4; i++){
          if(room.players[i])
               room.players[i].lives++;
      }
      for (var i = 0; i < 4; i++) {
        if (room.players[i] == null) {
          room.state = 'wait';
        } else {
          room.players[i].ready = false;
        }
      }

      io.sockets.in('room_' + player.room.number).emit('go back to game room', room);
      io.sockets.in('room_' + player.room.number).emit('room status change', room);
      socket.broadcast.in('idle').emit('room status change', rooms);
    }

  });

});
