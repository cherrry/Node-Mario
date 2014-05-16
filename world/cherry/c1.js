module.exports = (function () {
  var Stage = {};

  Stage.width = 70;
  Stage.height = 15;

  Stage.theme = 'theme3';

  // create arrays for storage
  Stage.solids = Array();
  Stage.collectibles = Array();


  // Bottom player
  Stage.solids.push({ x: 0, y: Stage.height - 2, type: 'Land', attr: { frame: 1, repeat: { x: Stage.width - 10, y: 1 } } });
  Stage.solids.push({ x: 0, y: Stage.height - 1, type: 'Land', attr: { frame: 13, repeat: { x: Stage.width - 10, y: 1 } } });

  Stage.solids.push({ x: Stage.width - 10, y: Stage.height - 2, type: 'Land', attr: { frame: 2 } });
  Stage.solids.push({ x: Stage.width - 10, y: Stage.height - 1, type: 'Land', attr: { frame: 14 } });

  // tubes
  var tube_x = [ 10, 16, 39, 48 ];
  var tube_h = [ 3, 3, 4, 5 ];

  for (var i = 0; i < tube_x.length; i++) {
    Stage.solids.push({ x: tube_x[i], y: Stage.height - 2 - tube_h[i], type: 'Tube', attr: { frame: 0 } });
    for (var j = 1; j < tube_h[i]; j++) {
      Stage.solids.push({ x: tube_x[i], y: Stage.height - 2 - tube_h[i] + j, type: 'Tube', attr: { frame: 1 } });
    }
  }

  // mushroom
  Stage.collectibles.push({ x: 13, y: Stage.height - 3, type: 'Mushroom', collidable: true, attr: { id: 'mushroom_0', color: 'brown', state: 'alive' } });
  Stage.collectibles.push({ x: 43, y: Stage.height - 3, type: 'Mushroom', collidable: true, attr: { id: 'mushroom_1', color: 'brown', state: 'alive' } });
  Stage.collectibles.push({ x: 45, y: Stage.height - 3, type: 'Mushroom', collidable: true, attr: { id: 'mushroom_2', color: 'brown', state: 'alive' } });

  // hidden brick
  var brick_id = 0;
  var brick_item = [
    [ 'Coin', 'Coin', 'Coin', 'Coin', 'Coin', null ],
    [ 'Coin', 'OneUp', 'Coin', 'OneUp', 'Coin', null ],
    [], [],
    (function () { var coins = []; for (var i = 0; i < 200; i++) { coins[i] = 'Coin'; } coins.push(null); return coins; })(),  
    [ 'Mushroom', 'Coin', 'Coin', 'Coin', 'Coin', 'Coin', 'PowerUp' ]
  ];
  for (var i = 0; i < brick_item.length; i++) {
    Stage.collectibles.push({ x: 21 + i, y: Stage.height - 6, type: 'Water', collidable: true, attr: { type: 'downward' } });
    if (brick_item[i].length > 0) {
      Stage.collectibles.push({ x: 21 + i , y: Stage.height - 5, type: 'Brick', collidable: true, attr: { id: 'brick_' + (brick_id++), item: brick_item[i], breakable: true, visible: (i == 0) } });
    }
  }
  Stage.solids.push({ x: 21, y: 8, type: 'Land', attr: { frame: 23, repeat: { x: 6, y: 1 } } });

  // visible coins
  var coin_id = 0;
  Stage.solids.push({ x: 30, y: Stage.height - 6, type: 'Land', attr: { frame: 4, repeat: { x: 1, y: 1 } } });
  Stage.solids.push({ x: 31, y: Stage.height - 6, type: 'Land', attr: { frame: 5, repeat: { x: 6, y: 1 } } });
  Stage.solids.push({ x: 37, y: Stage.height - 6, type: 'Land', attr: { frame: 6, repeat: { x: 1, y: 1 } } });
  for (var i = 0; i < 8; i++) {
    Stage.collectibles.push({ x: 30 + i, y: Stage.height - 5 + (i % 2), type: 'Coin', collidable: false, attr: { id: 'coin_' + (coin_id++) } });
    Stage.collectibles.push({ x: 30 + i, y: Stage.height - 8 + (i % 2), type: 'Coin', collidable: false, attr: { id: 'coin_' + (coin_id++) } });
  }

  Stage.collectibles.push({ x: 42, y: Stage.height - 6, type: 'Brick', collidable: true, attr: { id: 'brick_' + (brick_id++), item: [], visible: true } });
  Stage.collectibles.push({ x: 44, y: Stage.height - 6, type: 'Brick', collidable: true, attr: { id: 'brick_' + (brick_id++), item: [], visible: true } });
  Stage.collectibles.push({ x: 46, y: Stage.height - 6, type: 'Brick', collidable: true, attr: { id: 'brick_' + (brick_id++), item: [], visible: true } });


  // Upper player
  Stage.collectibles.push({ x: 16, y: 3, type: 'Mushroom', collidable: true, attr: { id: 'upper_mushroom_a' } });
  // Stage.solids.push({ x: 2, y: Stage.height - 5, type: 'Land', attr: { frame: 0 } }); // TODO: should be removed

  Stage.solids.push({ x: 3, y: 0, type: 'Land', attr: { frame: 39, repeat: { x: 1, y: 7 } } }); // TODO: repeat y should be 7
  Stage.solids.push({ x: 3, y: 7, type: 'Land', attr: { frame: 32, repeat: { x: 1, y: 1 } } });
  Stage.solids.push({ x: 4, y: 7, type: 'Land', attr: { frame: 5, repeat: { x: 6, y: 1 } } });

  Stage.solids.push({ x: 10, y: 0, type: 'Tube', attr: { frame: 1 } });
  Stage.solids.push({ x: 10, y: 1, type: 'Tube', attr: { frame: 1 } });
  Stage.solids.push({ x: 10, y: 2, type: 'Tube', attr: { frame: 2 } });
  Stage.solids.push({ x: 16, y: 0, type: 'Tube', attr: { frame: 2 } });

  // stairs
  Stage.solids.push({ x: 10, y: 7, type: 'Land', attr: { frame: 55 } });

  var stair_w = [ 2, 2, 3, 2 ], stair_ws = [ 0, 2, 4, 7 ];
  for (var i = 0; i < stair_w.length; i++) {
    Stage.solids.push({ x: 10 + stair_ws[i], y: 6 - i, type: 'Land', attr: { frame: 24 } });
    Stage.solids.push({ x: 11 + stair_ws[i], y: 6 - i, type: 'Land', attr: { frame: 1, repeat: { x: stair_w[i] - 1, y: 1 } } });
    if (i > 0) {
      Stage.solids.push({ x: 10 + stair_ws[i], y: 7 - i, type: 'Land', attr: { frame: 53 } });
    }
  }
  Stage.solids.push({ x: 11, y: 7, type: 'Land', attr: { frame: 49, repeat: { x: 8, y: 1 } } });
  Stage.solids.push({ x: 13, y: 6, type: 'Land', attr: { frame: 37, repeat: { x: 6, y: 1 } } });
  Stage.solids.push({ x: 15, y: 5, type: 'Land', attr: { frame: 37, repeat: { x: 4, y: 1 } } });
  Stage.solids.push({ x: 18, y: 4, type: 'Land', attr: { frame: 37, repeat: { x: 1, y: 1 } } });

  Stage.solids.push({ x: 19, y: 3, type: 'Land', attr: { frame: 42 } });
  Stage.solids.push({ x: 19, y: 4, type: 'Land', attr: { frame: 38, repeat: { x: 1, y: 3 } } });
  Stage.solids.push({ x: 19, y: 7, type: 'Land', attr: { frame: 54 } });

  Stage.solids.push({ x: 20, y: 3, type: 'Land', attr: { frame: 5, repeat: { x: 2, y: 1 } } });
  Stage.solids.push({ x: 26, y: 3, type: 'Land', attr: { frame: 5, repeat: { x: 2, y: 1 } } });

  Stage.solids.push({ x: 22, y: 3, type: 'Land', attr: { frame: 6 } });
  Stage.solids.push({ x: 25, y: 3, type: 'Land', attr: { frame: 4 } });

  Stage.solids.push({ x: 20, y: 7, type: 'Land', attr: { frame: 5, repeat: { x: 8, y: 1 } } });

  Stage.solids.push({ x: 28, y: 3, type: 'Land', attr: { frame: 21 } });
  Stage.solids.push({ x: 28, y: 4, type: 'Land', attr: { frame: 39, repeat: { x: 1, y: 3 } } });
  Stage.solids.push({ x: 28, y: 7, type: 'Land', attr: { frame: 33 } });

  // coins in the hole
  for (i = 0; i < 7; i++) {
    Stage.collectibles.push({ x: 20 + i, y: 4 + (i % 2), type: 'Coin', collidable: false, attr: { id: 'coin_' + (coin_id++) } });
  }
  Stage.collectibles.push({ x: 27 , y: 4, type: 'Brick', collidable: true, attr: { id: 'brick_' + (brick_id++), item: (function () { var item = []; for (var i = 0; i < 200; i++) { item[i] = 'Coin'; } return item; })(), visible: false } });
  Stage.collectibles.push({ x: 22, y: 6, type: 'Mushroom', collidable: true, attr: { id: 'upper_mushroom_0' } });
  Stage.collectibles.push({ x: 24, y: 6, type: 'Mushroom', collidable: true, attr: { id: 'upper_mushroom_1' } });

  // hidden brick enabled by lower player
  for (var i = 0; i < 8; i++) {
    Stage.collectibles.push({ x: 30 + i, y: 4, type: 'Brick', collidable: true, attr: { id: 'brick_' + (brick_id++), item: [ null ], visible: false , breakable: (i % 2) } });
  } // TODO: should be invisible

  Stage.solids.push({ x: 39, y: 1, type: 'Land', attr: { frame: 4 } });
  Stage.solids.push({ x: 40, y: 1, type: 'Land', attr: { frame: 5, repeat: { x: 20, y: 1 } } });
  Stage.solids.push({ x: 60, y: 1, type: 'Land', attr: { frame: 21 } });

  Stage.solids.push({ x: 39, y: 4, type: 'Land', attr: { frame: 4 } });
  Stage.solids.push({ x: 40, y: 4, type: 'Land', attr: { frame: 5, repeat: { x: 20, y: 1 } } });
  Stage.solids.push({ x: 60, y: 4, type: 'Land', attr: { frame: 33 } });

  Stage.solids.push({ x: 60, y: 2, type: 'Land', attr: { frame: 39, repeat: { x: 1, y: 2 } } });

  // Coins
  for (var i = 0; i < 10; i++) {
    Stage.collectibles.push({ x: 39 + i, y: 2 + (i % 2), type: 'Coin', collidable: false, attr: { id: 'coin_' + (coin_id++) } });
  }


  // near the flag
  var rock = [ 8, 8, 7, 6, 5, 4, 3, 2, 1 ];
  for (var i = 0; i < rock.length; i++) {
    Stage.solids.push({ x: Stage.width - 10 - i, y: Stage.height - 2 - rock[i], type: 'Land', attr: { frame: 23, repeat: { x: 1, y: rock[i] } } });
  }


  for (var i = 0; i < 4; i++) {
    Stage.collectibles.push({ x: Stage.width - 9 + i, y: Stage.height - 1, type: 'Water', collidable: true, attr: {} });
  }

  // winning position
  Stage.solids.push({ x: Stage.width - 5, y: Stage.height - 2, type: 'Land', attr: { frame: 0 } });
  Stage.solids.push({ x: Stage.width - 5, y: Stage.height - 1, type: 'Land', attr: { frame: 12 } });

  Stage.solids.push({ x: Stage.width - 4, y: Stage.height - 2, type: 'Land', attr: { frame: 1, repeat: { x: 4, y: 1 } } });
  Stage.solids.push({ x: Stage.width - 4, y: Stage.height - 1, type: 'Land', attr: { frame: 13, repeat: { x: 4, y: 1 } } });

  Stage.collectibles.push({ x: Stage.width - 3, y: Stage.height - 10, type: 'Flagpole', collidable: false, attr: { id: 'flagpole' } });
  Stage.collectibles.push({ x: Stage.width - 3, y: Stage.height - 10, type: 'Flag', collidable: false, attr: { id: 'flag', music: 'end-level' } });

  return Stage;
})();
