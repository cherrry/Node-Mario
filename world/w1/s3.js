module.exports = (function () {
  var Stage = {};

  Stage.width = 50;
  Stage.height = 15;

  Stage.theme = 'theme';

  // Dead End
  // define solids
  Stage.solids = Array();

  // Buttom Land

  Stage.solids.push({ x: 0, y: Stage.height - 4, type: 'Land', attr: { frame: 1, repeat: { x: 10, y: 1 } } });
  for (var i = 0; i < 32; i++) {
    if (i<9){
      Stage.solids.push({ x: i, y: Stage.height - 3, type: 'Land', attr: {} });
      Stage.solids.push({ x: i, y: Stage.height - 4, type: 'Land', attr: {} });
    }
    Stage.solids.push({ x: i, y: Stage.height - 1, type: 'Land', attr: {} });
    Stage.solids.push({ x: i, y: Stage.height - 2, type: 'Land', attr: {} });
  }
  for (var i = 40; i < 50; i++) {
    Stage.solids.push({ x: i, y: Stage.height - 1, type: 'Land', attr: {} });
    Stage.solids.push({ x: i, y: Stage.height - 2, type: 'Land', attr: {} });
  }
  Stage.solids.push({ x: 30, y: Stage.height - 3, type: 'Block', attr: {} });
  Stage.solids.push({ x: 31, y: Stage.height - 3, type: 'Block', attr: {} });

  // Top Land
  for (var i = 0; i < 23; i++) {
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

  for (var i = 23; i < 30; i++){
     Stage.collectibles.push({ x: i, y: Stage.height - 5, type: 'Brick', collidable: true, attr: { id: 'brick_support' + i, item: [], visible:false } });
  }

  for (var i = 22; i < 26; i++) {
    Stage.collectibles.push({ x: i, y: Stage.height - 8, type: 'Brick', collidable: true, attr: { id: 'brick_' + i, item:['Power-Up', 'Coin', 'Coin'], visible:true } });
  }

  for (var i = 18; i < 20; i++) {
    Stage.collectibles.push({ x: i, y: Stage.height - 8, type: 'Brick', collidable: true, attr: { id: 'brick_' + i, item: [], visible:false } });
  }

  Stage.collectibles.push({ x: 17, y: Stage.height - 6, type: 'Mushroom', collidable: true, attr: { id: 'mushroom_0', color: 'brown', state: 'alive' } });
  

  Stage.collectibles.push({ x: 14, y: Stage.height - 5, type: 'Brick', collidable: true, attr: { id: 'brick_0', item: [], visible:false } });

  Stage.collectibles.push({ x: Stage.width - 3, y: Stage.height - 10, type: 'Flagpole', collidable: false, attr: { id: 'flagpole' } });
  Stage.collectibles.push({ x: Stage.width - 3, y: Stage.height - 10, type: 'Flag', collidable: false, attr: { id: 'flag', music: 'end-level' } });

  for (var i = 32; i < 40; i++) {
    Stage.collectibles.push({ x: i, y: Stage.height - 1, type: 'Water', collidable: true, attr: {} });
  }

  Stage.collectibles.push({ x: 30, y: Stage.height - 4, type: 'Water', collidable: true, attr: {} });
  Stage.collectibles.push({ x: 31, y: Stage.height - 4, type: 'Water', collidable: true, attr: {} });

  for (var i = 10; i < 15; i++) {
    Stage.collectibles.push({ x: i, y: Stage.height - 3, type: 'Coin', collidable: false, attr: { id: 'coin_' + (i) } });
  }

  return Stage;
})();
