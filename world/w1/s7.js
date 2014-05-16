module.exports = (function () {
  var Stage = {};

  Stage.width = 65;
  Stage.height = 15;

  Stage.theme = 'theme';
  Stage.background = 'dark';

  // Solids
  Stage.solids = Array();

  // Ground level
  // Horizontal
  Stage.solids.push({ x: 0, y: Stage.height - 2, type: 'Land', attr: { frame: 59, repeat: { x: 9, y: 1 } } });
  Stage.solids.push({ x: 0, y: Stage.height - 1, type: 'Land', attr: { frame: 59, repeat: { x: 41, y: 1 } } });
  Stage.solids.push({ x: 51, y: Stage.height - 2, type: 'Land', attr: { frame: 59, repeat: { x: 14, y: 2 } } });
  Stage.solids.push({ x: 41, y: Stage.height - 3, type: 'Land', attr: { frame: 59, repeat: { x: 1, y: 1 } } });
 
  // Vertical
  Stage.solids.push({ x: 9, y: Stage.height - 3, type: 'Land', attr: { frame: 59, repeat: { x: 1, y: 2 } } });
  Stage.solids.push({ x: 40, y: Stage.height - 3, type: 'Land', attr: { frame: 59, repeat: { x: 1, y: 2 } } });

  // Upper level
  // 1st vertical
  Stage.solids.push({ x: 3, y: 0, type: 'Land', attr: { frame: 59, repeat: { x: 1, y: Stage.height - 4  } } });
  // 2nd vertical
  Stage.solids.push({ x: 9, y: 0, type: 'Land', attr: { frame: 59, repeat: { x: 1, y: 8  } } });
  Stage.solids.push({ x: 9, y: Stage.height - 6, type: 'Land', attr: { frame: 59, repeat: { x: 1, y: 2 } } });
  // 3rd vertical
  Stage.solids.push({ x: 40, y: 0, type: 'Land', attr: { frame: 59, repeat: { x: 1, y: 8  } } });
  Stage.solids.push({ x: 40, y: Stage.height - 6, type: 'Land', attr: { frame: 59, repeat: { x: 1, y: 2  } } });
  // Horizontal
  Stage.solids.push({ x: 4, y: Stage.height - 5, type: 'Land', attr: { frame: 59, repeat: { x: 6, y: 1  } } });

  // Collectibles
  Stage.collectibles = Array();


  // Questions in gorund level
  for (var i = 10; i < 40; i++) {
    var item = [];
    var pool = ['One-Up', 'Coin', 'Mushroom'];
    for (var j = 0; j < 3; j++) {
      item.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    Stage.collectibles.push({ x: i, y: Stage.height - 5, type: 'Brick', collidable: true, attr: { id: 'brick_1_' + i, item: item, visible: true } });
  }

  // Questions in top level and ground
  for (var i = 10; i < 40; i++) {
    var item = [];
    var pool = ['One-Up', 'Coin', 'Mushroom'];
    for (var j = 0; j < 5; j++) {
      item.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    // Hack: item with same id, when touching to upper birck, the lower brick will be triggered
    Stage.collectibles.push({ x: i, y: Stage.height - 8, type: 'Brick', collidable: true, attr: { id: 'brick_2_' + i, item: item, visible: true } });
    Stage.collectibles.push({ x: i, y: Stage.height - 2, type: 'Brick', collidable: true, attr: { id: 'brick_2_' + i, item: item, visible: true } });
  }

  // Mushrooms
  for (var i = 10; i < 40; i += 10) {
    Stage.collectibles.push({ x: i, y: Stage.height - 3, type: 'Mushroom', collidable: true, attr: { id: 'mushroom_1_' + i, color: 'brown', state: 'alive' } });
    Stage.collectibles.push({ x: i, y: Stage.height - 7, type: 'Mushroom', collidable: true, attr: { id: 'mushroom_2_' + i, color: 'brown', state: 'alive' } });
  }

  // Lava
  for (var i = 41; i < 51; i++) {
    Stage.collectibles.push({ x: i, y: Stage.height - 1, type: 'Water', collidable: true, attr: { type:'lava' } });
  }

  // Last bricks and coins (only one now)
  for (var i = 43, j = Stage.height - 6; i <= 43; i+=2, j-=3) {
    Stage.collectibles.push({ x: i, y: j, type: 'Brick', collidable: true, attr: { id: 'brick_3_' + i, item: [], visible: false } });
    Stage.collectibles.push({ x: i - 1, y: j, type: 'Coin', collidable: false, attr: { id: 'coin_1_' + i + '_' + j } });
    Stage.collectibles.push({ x: i + 1, y: j, type: 'Coin', collidable: false, attr: { id: 'coin_2_' + i + '_' + j } });
    Stage.collectibles.push({ x: i, y: j - 1, type: 'Coin', collidable: false, attr: { id: 'coin_3_' + i + '_' + j } });
    Stage.collectibles.push({ x: i, y: j + 1, type: 'Coin', collidable: false, attr: { id: 'coin_4_' + i + '_' + j } });
  }

  // Flag
  Stage.collectibles.push({ x: Stage.width - 4, y: Stage.height - 10, type: 'Flagpole', collidable: false, attr: { id: 'flagpole' } });
  Stage.collectibles.push({ x: Stage.width - 4, y: Stage.height - 10, type: 'Flag', collidable: false, attr: { id: 'flag', music: 'end-level' } });

  return Stage;
})();
