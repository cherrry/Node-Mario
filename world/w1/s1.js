module.exports = (function () {
  var Stage = {};

  Stage.width = 30;
  Stage.height = 10;

  // define solids
  Stage.solids = Array();

  for (var i = 0; i < 30; i++) {
    Stage.solids.push({ x: i, y: 9, type: 'Land', attr: {} });
  }

  Stage.solids.push({ x: 6, y: 8, type: 'Tube', attr: { frame: 1 } });
  Stage.solids.push({ x: 6, y: 7, type: 'Tube', attr: { frame: 0 } });

  Stage.solids.push({ x: 14, y: 8, type: 'Tube', attr: { frame: 1 } });
  Stage.solids.push({ x: 14, y: 7, type: 'Tube', attr: { frame: 1 } });
  Stage.solids.push({ x: 14, y: 6, type: 'Tube', attr: { frame: 0 } });

  Stage.solids.push({x: 5, y: 5, type: 'Brick', attr: { isEmpty: 0}});
  Stage.solids.push({x: 4, y: 4, type: 'Brick', attr: { isEmpty: 1}});

  // define collectibles
  Stage.collectibles = Array();

  Stage.collectibles.push({ x: 9, y: 8, type: 'Mushroom', attr: { id: 'mushroom_0', color: 'brown' } });
  Stage.collectibles.push({ x: 28, y: 1, type: 'Flagpole', attr: { id: 'flagpole' } });

  return Stage;
})();
