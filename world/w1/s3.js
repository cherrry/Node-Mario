module.exports = (function () {
  var Stage = {};

  Stage.width = 50;
  Stage.height = 15;

  Stage.theme = 'theme';

  // define solids
  Stage.solids = Array();

  for (var i = 0; i < 25; i++) {
    Stage.solids.push({ x: i, y: Stage.height - 1, type: 'Land', attr: {} });
    Stage.solids.push({ x: i, y: Stage.height - 2, type: 'Land', attr: {} });
  }

  for (var i = 47; i < 50; i++) {
    Stage.solids.push({ x: i, y: Stage.height - 1, type: 'Land', attr: {} });
    Stage.solids.push({ x: i, y: Stage.height - 2, type: 'Land', attr: {} });
  }

  for (var i = 0; i < 33; i++) {
    if (i != 14){
      Stage.solids.push({ x: i, y: Stage.height - 5, type: 'Land', attr: {} });
    }
  }

  Stage.solids.push({ x: 15, y: Stage.height - 7, type: 'Tube', attr: { frame: 0 } });
  Stage.solids.push({ x: 15, y: Stage.height - 6, type: 'Tube', attr: { frame: 1 } });

  Stage.solids.push({ x: 20, y: Stage.height - 9, type: 'Tube', attr: { frame: 0 } });
  Stage.solids.push({ x: 20, y: Stage.height - 8, type: 'Tube', attr: { frame: 1 } });
  Stage.solids.push({ x: 20, y: Stage.height - 7, type: 'Tube', attr: { frame: 1 } });
  Stage.solids.push({ x: 20, y: Stage.height - 6, type: 'Tube', attr: { frame: 1 } });


  Stage.collectibles = Array();

  for (var i = 22; i < 26; i++) {
    Stage.collectibles.push({ x: i, y: Stage.height - 8, type: 'Brick', collidable: true, attr: { id: 'brick_' + i, item:['Power-Up', 'Coin', 'Coin'], visible:true } });
  }

  for (var i = 18; i < 20; i++) {
    Stage.collectibles.push({ x: i, y: Stage.height - 8, type: 'Brick', collidable: true, attr: { id: 'brick_' + i, item: [], visible:false } });
  }

  Stage.collectibles.push({ x: 17, y: Stage.height - 6, type: 'Mushroom', collidable: true, attr: { id: 'mushroom_0', color: 'brown', state: 'alive' } });
  

  Stage.collectibles.push({ x: 14, y: Stage.height - 5, type: 'Brick', collidable: true, attr: { id: 'brick_0', item: [], visible:false } });

  Stage.collectibles.push({ x: 20, y: 12, type: 'Boat', collidable: true, attr: { id: 'box_0' } });

  Stage.collectibles.push({ x: Stage.width - 3, y: Stage.height - 10, type: 'Flagpole', collidable: false, attr: { id: 'flagpole' } });
  Stage.collectibles.push({ x: Stage.width - 3, y: Stage.height - 10, type: 'Flag', collidable: false, attr: { id: 'flag' } });

  for (var i = 25; i < 47; i++) {
    Stage.collectibles.push({ x: i, y: Stage.height - 1, type: 'Water', collidable: true, attr: {} });
  }

  for (var i = 0; i < 5; i++) {
    Stage.collectibles.push({ x: i, y: Stage.height - 3, type: 'Coin', collidable: false, attr: { id: 'coin_' + (i) } });
  }

  return Stage;
})();
