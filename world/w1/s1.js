module.exports = (function () {
  var Stage = {};

  Stage.width = 50;
  Stage.height = 15;

  // define solids
  Stage.solids = Array();

  for (var i = 0; i < Stage.width; i++) {
    Stage.solids.push({ x: i, y: 14, type: 'Land', attr: {} });
  }

  Stage.solids.push({ x: 6, y: 13, type: 'Tube', attr: { frame: 1 } });
  Stage.solids.push({ x: 6, y: 12, type: 'Tube', attr: { frame: 0 } });

  Stage.solids.push({ x: 14, y: 13, type: 'Tube', attr: { frame: 1 } });
  Stage.solids.push({ x: 14, y: 12, type: 'Tube', attr: { frame: 1 } });
  Stage.solids.push({ x: 14, y: 11, type: 'Tube', attr: { frame: 0 } });

  Stage.solids.push({ x: 22, y: 13, type: 'Tube', attr: { frame: 1 } });
  Stage.solids.push({ x: 22, y: 12, type: 'Tube', attr: { frame: 0 } });


  // define collectibles
  Stage.collectibles = Array();

  for (var i = 7; i < 12; i++) {
    Stage.collectibles.push({ x: i, y: Stage.height - 7, type: 'Brick', collidable: true, attr: { id: 'brick_' + i, item:['power-up'] } });
  }

  Stage.collectibles.push({ x: 16, y: Stage.height - 7, type: 'Brick', collidable: true, attr: { id: 'brick_' + i, item: [] } });

  Stage.collectibles.push({ x: 9, y: 13, type: 'Mushroom', collidable: true, attr: { id: 'mushroom_0', color: 'brown', state: 'alive' } });
  Stage.collectibles.push({ x: 16, y: 13, type: 'Mushroom', collidable: true, attr: { id: 'mushroom_1', color: 'brown', state: 'alive' } });
  Stage.collectibles.push({ x: 18, y: 13, type: 'Mushroom', collidable: true, attr: { id: 'mushroom_2', color: 'brown', state: 'alive' } });


  Stage.collectibles.push({ x: Stage.width - 3, y: Stage.height -9, type: 'Flagpole', collidable: false, attr: { id: 'flagpole' } });
  Stage.collectibles.push({ x: 23, y: 13, type: 'PowerUp', collidable: false, attr: { id: 'powerup_0', type: 'grow' } });

  for (var i = 7; i < 12; i++) {
    Stage.collectibles.push({ x: i, y: Stage.height - 8, type: 'Coin', collidable: false, attr: { id: 'coin_' + (i - 7) } });
  }

  return Stage;
})();
