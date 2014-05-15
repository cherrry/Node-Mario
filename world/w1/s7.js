module.exports = (function () {
  var Stage = {};

  Stage.width = 65;
  Stage.height = 15;

  Stage.theme = 'theme3';
  Stage.background = 'dark';

  // Solids
  Stage.solids = Array();

  // Ground level
  Stage.solids.push({ x: 0, y: Stage.height - 2, type: 'Land', attr: { frame: 23, repeat: { x: 9, y: 1 } } });
  Stage.solids.push({ x: 0, y: Stage.height - 1, type: 'Land', attr: { frame: 23, repeat: { x: Stage.width, y: 1 } } });
 
  Stage.solids.push({ x: 9, y: Stage.height - 3, type: 'Land', attr: { frame: 23, repeat: { x: 1, y: 2 } } });
  Stage.solids.push({ x: 30, y: Stage.height - 3, type: 'Land', attr: { frame: 23, repeat: { x: 1, y: 2 } } });

  // Upper level
  Stage.solids.push({ x: 3, y: 0, type: 'Land', attr: { frame: 23, repeat: { x: 1, y: Stage.height - 5  } } });
  Stage.solids.push({ x: 30, y: 0, type: 'Land', attr: { frame: 23, repeat: { x: 1, y: 6  } } });
  Stage.solids.push({ x: 9, y: 0, type: 'Land', attr: { frame: 23, repeat: { x: 1, y: 6  } } });
  Stage.solids.push({ x: 30, y: 8, type: 'Land', attr: { frame: 23, repeat: { x: 1, y: 2  } } });

  Stage.solids.push({ x: 4, y: Stage.height - 6, type: 'Land', attr: { frame: 23, repeat: { x: 6, y: 1  } } });
  Stage.solids.push({ x: 9, y: Stage.height - 7, type: 'Land', attr: { frame: 23, repeat: { x: 1, y: 2 } } });

  // Collectibles
  Stage.collectibles = Array();

  // Questions in low level
  for (var i = 10; i < 30; i++) {
    var item = [];
    var pool = ['Power-Up', 'One-Up', 'Coin', 'Mushroom', 'Mushroom', 'Mushroom'];
    for (var j = 0; j < 3; j++) {
      item.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    Stage.collectibles.push({ x: i, y: Stage.height - 6, type: 'Brick', collidable: true, attr: { id: 'brick_1_' + i, item: item, visible: true } });
  }

  // Questions in top level and ground
  for (var i = 10; i < 30; i++) {
    var item = [];
    var pool = ['Power-Up', 'One-Up', 'Coin', 'Mushroom', 'Mushroom', 'Mushroom'];
    for (var j = 0; j < 5; j++) {
      item.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    // Hack: item with same id, when touching to upper birck, the lower brick will be triggered
    Stage.collectibles.push({ x: i, y: Stage.height - 10, type: 'Brick', collidable: true, attr: { id: 'brick_2_' + i, item: [], visible: true } });
    Stage.collectibles.push({ x: i, y: Stage.height - 2, type: 'Brick', collidable: true, attr: { id: 'brick_2_' + i, item: item, visible: true } });
  }

  // Mushrooms
  for (var i = 10; i < 30; i += 4) {
    Stage.collectibles.push({ x: i, y: Stage.height - 3, type: 'Mushroom', collidable: true, attr: { id: 'mushroom_1_' + i, color: 'brown', state: 'alive' } });
    Stage.collectibles.push({ x: i, y: Stage.height - 7, type: 'Mushroom', collidable: true, attr: { id: 'mushroom_2_' + i, color: 'brown', state: 'alive' } });
  }

  // Coins
  for (var i = 31; i < 56; i++) {
    for (var j = Stage.height - 5; j < Stage.height - 1; j++) {
      Stage.collectibles.push({ x: i, y: j, type: 'Coin', collidable: false, attr: { id: 'coin_1_' + i + '_' + j } });
    }
  }

  // Flag
  Stage.collectibles.push({ x: Stage.width - 4, y: Stage.height - 9, type: 'Flagpole', collidable: false, attr: { id: 'flagpole' } });
  Stage.collectibles.push({ x: Stage.width - 4, y: Stage.height - 9, type: 'Flag', collidable: false, attr: { id: 'flag', music: 'end-level' } });

  return Stage;
})();
