module.exports = (function () {
  var Stage = {};

  Stage.width = 50;
  Stage.height = 15;

  Stage.theme = 'theme';

  // define solids
  Stage.solids = Array();

  // Base Land
  for (var i = 0; i <= 9; i++) {
    Stage.solids.push({ x: i, y: Stage.height - 2, type: 'Block', attr: {} });
    Stage.solids.push({ x: i, y: Stage.height - 1, type: 'Block', attr: {} });
  }

  for (var i = 11; i <= 13; i++) {
    Stage.solids.push({ x: i, y: Stage.height - 2, type: 'Block', attr: {} });
    Stage.solids.push({ x: i, y: Stage.height - 1, type: 'Block', attr: {} });
  }
  for (var i = 17; i <= 26; i++) {
    if (i<19 || i>23){
      Stage.solids.push({ x: i, y: Stage.height - 2, type: 'Block', attr: {} });
    }
    Stage.solids.push({ x: i, y: Stage.height - 1, type: 'Block', attr: {} });
  }
  for (var i = 29; i <= 32; i++) {
    if (i<31){
      Stage.solids.push({ x: i, y: Stage.height - 2, type: 'Block', attr: {} });
    }
    Stage.solids.push({ x: i, y: Stage.height - 1, type: 'Block', attr: {} });
  }
  for (var i = 33; i <= 40; i++) {
    if (i<35 || i>37){
      Stage.solids.push({ x: i, y: Stage.height - 2, type: 'Block', attr: {} });
    }
    Stage.solids.push({ x: i, y: Stage.height - 1, type: 'Block', attr: {} });
  }
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j <= i; j++){
      Stage.solids.push({ x: i+44, y: Stage.height - 2 - j, type: 'Block', attr: {} });
    }
  }
  for (var i = 44; i <= 48; i++) {
    Stage.solids.push({ x: i, y: Stage.height - 1, type: 'Block', attr: {} });
  }

  // Upper Block
  for (var i = 5; i <= 9; i++) {
    for (var j = 2; j <= 10; j++) {
      Stage.solids.push({ x: i, y: j, type: 'Block', attr: {} });
    }
  }
  Stage.solids.push({ x: 5, y: 0, type: 'Block', attr: {} });
  Stage.solids.push({ x: 5, y: 1, type: 'Block', attr: {} });
  for (var j = 2; j <= 10; j++) {
    Stage.solids.push({ x: 11, y: j, type: 'Block', attr: {} });
    Stage.solids.push({ x: 17, y: j, type: 'Block', attr: {} });
    Stage.solids.push({ x: 30, y: j, type: 'Block', attr: {} });
    Stage.solids.push({ x: 39, y: j, type: 'Block', attr: {} });
  }
  Stage.solids.push({ x: 12, y: 2, type: 'Block', attr: {} });
  for (var i = 13; i <= 41; i++) {
    Stage.solids.push({ x: i, y: 2, type: 'Block', attr: {} });
  }
  for (var i = 17; i <= 25; i++) {
    Stage.solids.push({ x: i, y: Stage.height - 5, type: 'Block', attr: {} });
  }
  for (var i = 30; i <= 38; i++) {
    Stage.solids.push({ x: i, y: Stage.height - 5, type: 'Block', attr: {} });
  }


  // define collectibles
  Stage.collectibles = Array();

  // water
  var seaIndex = [10, 14, 15, 16, 27, 28, 41, 42, 43, 49];
  for (var i=0; i<seaIndex.length; i++){
    Stage.collectibles.push({ x: seaIndex[i], y: Stage.height - 1, type: 'Water', collidable: true, attr: {} });
  }

  // Mushroom
  Stage.collectibles.push({ x: 20, y: 13, type: 'Mushroom', collidable: true, attr: { id: 'mushroom_0', color: 'brown', state: 'alive' } });
  Stage.collectibles.push({ x: 36, y: 13, type: 'Mushroom', collidable: true, attr: { id: 'mushroom_1', color: 'brown', state: 'alive' } });

  // climb up invisible brick
  Stage.collectibles.push({ x: 44, y: 9, type: 'Brick', collidable: true, attr: { id: 'brick_44', item: [], visible:false } });
  Stage.collectibles.push({ x: 43, y: 6, type: 'Brick', collidable: true, attr: { id: 'brick_43', item: [], visible:false } });
  Stage.collectibles.push({ x: 42, y: 3, type: 'Brick', collidable: true, attr: { id: 'brick_42', item: [], visible:false } });

  // Flag
  Stage.collectibles.push({ x: Stage.width - 4, y: Stage.height -13, type: 'Flagpole', collidable: false, attr: { id: 'flagpole' } });
  Stage.collectibles.push({ x: Stage.width - 4, y: Stage.height -13, type: 'Flag', collidable: false, attr: { id: 'flag', music: 'end-game' } });


  return Stage;
})();
