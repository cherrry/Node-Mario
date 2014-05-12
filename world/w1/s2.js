module.exports = (function () {
  var Stage = {};

  Stage.width = 50;
  Stage.height = 15;

  // define solids
  Stage.solids = Array();

  for (var i = 0; i < Stage.width; i++) {
    if (i < Stage.width -10){
      Stage.solids.push({ x: i, y: Stage.height - 1, type: 'Land', attr: {} });
    }else{
      //Stage.solids.push({ x: i, y: Stage.height - 1, type: 'Land', attr: {} });
    }
  }
  for (var i = 0; i < Stage.width-20; i++) {
    Stage.solids.push({ x: i, y: Stage.height - 2, type: 'Land', attr: {} });
  }

  Stage.collectibles = Array();

  Stage.collectibles.push({ x: Stage.width - 3, y: Stage.height -9, type: 'Flagpole', collidable: false, attr: { id: 'flagpole' } });

  for (var i = 0; i < Stage.width; i++) {
    if (i < Stage.width -10){
      //Stage.solids.push({ x: i, y: Stage.height - 1, type: 'Land', attr: {} });
    }else{
      Stage.collectibles.push({ x: i, y: Stage.height - 1, type: 'Water', collidable: true, attr: {} });
    }
  }

  return Stage;
})();
