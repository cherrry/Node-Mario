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

  Stage.solids.push({x: 5, y: 5, type: 'Brick', attr: { isEmpty: 0}});
  Stage.solids.push({x: 4, y: 4, type: 'Brick', attr: { isEmpty: 1}});

  // define collectibles
  Stage.collectibles = Array();

  Stage.collectibles.push({ x: 9, y: 13, type: 'Mushroom', collidable: true, attr: { id: 'mushroom_0', color: 'brown', state: 'alive' } });
  Stage.collectibles.push({ x: Stage.width - 3, y: Stage.height -9, type: 'Flagpole', collidable: true, attr: { id: 'flagpole' } });
  Stage.collectibles.push({ x: 20, y: 10, type: 'Coin', collidable: false, attr: { id: 'coin_0' } });

  return Stage;
})();
