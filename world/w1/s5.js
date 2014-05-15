module.exports = (function () {
  var Stage = {};

  Stage.width = 50;
  Stage.height = 15;

  Stage.theme = 'theme';
  Stage.background = 'dark';

  // Final World
  // define solids
  Stage.solids = Array();

  // Base Land
  Stage.solids.push({ x: 0, y: Stage.height - 2, type: 'Land', attr: { frame: 59, repeat: { x: 10, y: 2 } } });

  Stage.solids.push({ x: 11, y: Stage.height - 2, type: 'Land', attr: { frame: 59, repeat: { x: 3, y: 2 } } });

  Stage.solids.push({ x: 17, y: Stage.height - 2, type: 'Land', attr: { frame: 59, repeat: { x: 2, y: 1 } } });
  Stage.solids.push({ x: 24, y: Stage.height - 2, type: 'Land', attr: { frame: 59, repeat: { x: 3, y: 1 } } });
  Stage.solids.push({ x: 17, y: Stage.height - 1, type: 'Land', attr: { frame: 59, repeat: { x: 10, y: 1 } } });

  Stage.solids.push({ x: 29, y: Stage.height - 2, type: 'Land', attr: { frame: 59, repeat: { x: 2, y: 1 } } });
  Stage.solids.push({ x: 33, y: Stage.height - 2, type: 'Land', attr: { frame: 59, repeat: { x: 2, y: 1 } } });
  Stage.solids.push({ x: 38, y: Stage.height - 2, type: 'Land', attr: { frame: 59, repeat: { x: 3, y: 1 } } });
  Stage.solids.push({ x: 29, y: Stage.height - 1, type: 'Land', attr: { frame: 59, repeat: { x: 12, y: 1 } } });


  Stage.solids.push({ x: 44, y: Stage.height - 2, type: 'Land', attr: { frame: 59, repeat: { x: 5, y: 2 } } });
  for (var i = 0; i < 3; i++) {
    Stage.solids.push({ x: 47 - i , y: Stage.height - 5 + i, type: 'Land', attr: { frame: 59, repeat: { x: i+2, y: 1 } } });
  }

  // Upper Block
  Stage.solids.push({ x: 9, y: 2, type: 'Land', attr: { frame: 59, repeat: { x: 1, y: 9 } } });
  Stage.solids.push({ x: 11, y: 2, type: 'Land', attr: { frame: 59, repeat: { x: 1, y: 9 } } });
  Stage.solids.push({ x: 12, y: 2, type: 'Land', attr: { frame: 59, repeat: { x: 4, y: 1 } } });
  Stage.solids.push({ x: 17, y: 2, type: 'Land', attr: { frame: 59, repeat: { x: 10, y: 1 } } });
  Stage.solids.push({ x: 28, y: 2, type: 'Land', attr: { frame: 59, repeat: { x: 13, y: 1 } } });

  Stage.solids.push({ x: 17, y: 3, type: 'Land', attr: { frame: 59, repeat: { x: 1, y: 8 } } });
  Stage.solids.push({ x: 30, y: 3, type: 'Land', attr: { frame: 59, repeat: { x: 1, y: 8 } } });
  Stage.solids.push({ x: 39, y: 3, type: 'Land', attr: { frame: 59, repeat: { x: 1, y: 8 } } });

  Stage.solids.push({ x: 18, y: 10, type: 'Land', attr: { frame: 59, repeat: { x: 8, y: 1 } } });
  Stage.solids.push({ x: 31, y: 9, type: 'Land', attr: { frame: 59, repeat: { x: 8, y: 1 } } });
  Stage.solids.push({ x: 34, y: 10, type: 'Land', attr: { frame: 59, repeat: { x: 6, y: 1 } } });

  // define collectibles
  Stage.collectibles = Array();

  // lava
  var lavaIndex = [10, 14, 15, 16, 27, 28, 41, 42, 43, 49];
  for (var i=0; i<lavaIndex.length; i++){
    Stage.collectibles.push({ x: lavaIndex[i], y: Stage.height - 1, type: 'Water', collidable: true, attr: {type:'lava'} });
  }

  // Mushroom
  Stage.collectibles.push({ x: 20, y: 13, type: 'Mushroom', collidable: true, attr: { id: 'mushroom_0', color: 'brown', state: 'alive' } });
  Stage.collectibles.push({ x: 36, y: 13, type: 'Mushroom', collidable: true, attr: { id: 'mushroom_1', color: 'brown', state: 'alive' } });

  // 1st Content
  Stage.collectibles.push({ x: 12, y: 9, type: 'Brick', collidable: true, attr: { id: 'brick1_12', item: ['Power-Up'], visible:true } });
  Stage.collectibles.push({ x: 12, y: 5, type: 'Brick', collidable: true, attr: { id: 'brick1_13', item: ['Power-Up'], visible:true } });

  // 2nd Content
  for (var i = 18; i <= 25; i++) {
    Stage.collectibles.push({ x: i, y: Stage.height - 6, type: 'Coin', collidable: false, attr: { id: 'coin2_' + i } });
    if (i%2 == 1){
      Stage.collectibles.push({ x: i, y: 7, type: 'Brick', collidable: true, attr: { id: 'brick2_' + i, item: ['Power-Up'], visible:true } });
    }else{
      Stage.collectibles.push({ x: i, y: 4, type: 'Brick', collidable: true, attr: { id: 'brick2_' + i, item: ['Coin', 'Coin', 'Coin', 'Coin'], visible:true } });
    }
  }

  // 3rd Content
  Stage.collectibles.push({ x: 31, y: Stage.height - 5, type: 'Water', collidable: true, attr: {type:'downward'} });
  Stage.collectibles.push({ x: 32, y: Stage.height - 5, type: 'Water', collidable: true, attr: {type:'downward'} });
  Stage.collectibles.push({ x: 33, y: Stage.height - 5, type: 'Water', collidable: true, attr: {type:'downward'} });

  // climb up invisible brick
  Stage.collectibles.push({ x: 44, y: 9, type: 'Brick', collidable: true, attr: { id: 'brick_44', item: ['Coin', 'Coin', 'Coin'], breakable: true, visible:false } });
  Stage.collectibles.push({ x: 43, y: 6, type: 'Brick', collidable: true, attr: { id: 'brick_43', item: ['Coin', 'Coin', 'Coin'], breakable: true, visible:false } });
  Stage.collectibles.push({ x: 42, y: 3, type: 'Brick', collidable: true, attr: { id: 'brick_42', item: ['Coin', 'Coin', 'Coin'], breakable: true, visible:false } });

  // Upper Coins
  for (var i=9; i<42; i++){
    Stage.collectibles.push({ x: i, y: 1, type: 'Coin', collidable: false, attr: { id: 'coin_up_' + i } });
  }

  // Flag
  Stage.collectibles.push({ x: Stage.width - 4, y: Stage.height -13, type: 'Flagpole', collidable: false, attr: { id: 'flagpole' } });
  Stage.collectibles.push({ x: Stage.width - 4, y: Stage.height -13, type: 'Flag', collidable: false, attr: { id: 'flag', music: 'end-game' } });


  return Stage;
})();
