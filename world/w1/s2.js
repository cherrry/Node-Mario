module.exports = (function () {
  var Stage = {};

  Stage.width = 50;
  Stage.height = 15;

  // define solids
  Stage.solids = Array();

  for (var i = 0; i < Stage.width; i++) {
    Stage.solids.push({ x: i, y: Stage.height - 1, type: 'Land', attr: {} });
  }

  Stage.collectibles = Array();

  Stage.collectibles.push({ x: Stage.width - 3, y: Stage.height -9, type: 'Flagpole', collidable: false, attr: { id: 'flagpole' } });

  return Stage;
})();
