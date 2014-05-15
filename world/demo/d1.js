module.exports = (function () {
  var Stage = {};

  Stage.width = 50;
  Stage.height = 15;

  Stage.theme = 'theme';

  Stage.solids = Array();
  Stage.collectibles = Array();

  Stage.solids.push({ x: 0, y: Stage.height - 1, type: 'Land', attr: { frame: 1, repeat: { x: Stage.width, y: 1 } } });

  var tube_x = [ 10, 18, 30, 38 ];
  var tube_h = [ 3, 3, 4, 4 ];

  for (var i = 0; i < tube_x.length; i++) {
    Stage.solids.push({ x: tube_x[i], y: Stage.height - 1 - tube_h[i], type: 'Tube', attr: { frame: 0 } });
    for (var j = 1; j < tube_h[i]; j++) {
      Stage.solids.push({ x: tube_x[i], y: Stage.height - 1 - tube_h[i] + j, type: 'Tube', attr: { frame: 1 } });
    }
  }
  Stage.collectibles.push({ x: 13, y: Stage.height - 3, type: 'Mushroom', collidable: true, attr: { id: 'mushroom_0', color: 'brown', state: 'alive' } });

  Stage.collectibles.push({ x: Stage.width - 3, y: Stage.height - 9, type: 'Flagpole', collidable: false, attr: { id: 'flagpole' } });
  Stage.collectibles.push({ x: Stage.width - 3, y: Stage.height - 9, type: 'Flag', collidable: false, attr: { id: 'flag', music: 'end-level' } });

  return Stage;
})();
