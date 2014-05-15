module.exports = (function () {
  var Stage = {};

  Stage.width = 50;
  Stage.height = 15;

  Stage.theme = 'theme_usa';

  Stage.solids = Array();
  Stage.collectibles = Array();

  Stage.solids.push({ x: 0, y: Stage.height - 2, type: 'Land', attr: { frame: 1, repeat: { x: 20, y: 1 } } });
  Stage.solids.push({ x: 20, y: Stage.height - 2, type: 'Land', attr: { frame: 2 } });
  Stage.solids.push({ x: 27, y: Stage.height - 2, type: 'Land', attr: { frame: 0 } });
  Stage.solids.push({ x: 28, y: Stage.height - 2, type: 'Land', attr: { frame: 1, repeat: { x: 22, y: 1 } } });

  Stage.solids.push({ x: 0, y: Stage.height - 1, type: 'Land', attr: { frame: 37, repeat: { x: 20, y: 1 } } });
  Stage.solids.push({ x: 20, y: Stage.height - 1, type: 'Land', attr: { frame: 14 } });
  Stage.solids.push({ x: 27, y: Stage.height - 1, type: 'Land', attr: { frame: 12 } });
  Stage.solids.push({ x: 28, y: Stage.height - 1, type: 'Land', attr: { frame: 37, repeat: { x: 22, y: 1 } } });

  for (var i = 8; i < 20; i++) {
    Stage.collectibles.push({ x: i, y: Stage.height - 5 + (i % 2), type: 'Coin', attr: { id: 'coin_' + i } });
  }

  for (var i = 21; i < 27; i++) {
    Stage.collectibles.push({ x: i, y: Stage.height - 1, type: 'Water', attr: {} });
  }

  Stage.collectibles.push({ x: 30, y: Stage.height - 6, type: 'Brick', collidable: true, attr: { id: 'brick_0', item: (function () { var item = []; for (var i = 0; i < 10; i++) { item[i] = 'Coin'; } return item; })(), visible: true } });

  Stage.collectibles.push({ x: Stage.width - 3, y: Stage.height - 10, type: 'Flagpole', collidable: false, attr: { id: 'flagpole' } });
  Stage.collectibles.push({ x: Stage.width - 3, y: Stage.height - 10, type: 'Flag', collidable: false, attr: { id: 'flag', music: 'end-game' } });

  return Stage;
})();
